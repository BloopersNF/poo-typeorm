import { AppDataSource } from "../data-source";
import { TaskListService } from "../service/TaskListService";
import { TaskListManagerService } from "../service/TaskListManagerService";

describe("AppDataSource e Services - Testes de TaskList e TaskListManager", () => {
    let taskListService: TaskListService;
    let managerService: TaskListManagerService;

    beforeAll(async () => {
        await AppDataSource.initialize();
        taskListService = new TaskListService();
        managerService = new TaskListManagerService();
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it("deve criar um TaskListManager e uma TaskList, adicionar tarefas e excluir corretamente", async () => {
        const manager = await managerService.createTaskListManager();
        expect(manager).toBeDefined();
        expect(manager.id).toBeGreaterThan(0);

        const taskList = await taskListService.createTaskList("Lista de Tarefas Importantes");
        expect(taskList).toBeDefined();
        expect(taskList.title).toBe("Lista de Tarefas Importantes");

        const task1 = await taskListService.addTaskToTaskList(taskList.id, "Tarefa 1", "Descrição da Tarefa 1");
        expect(task1).toBeDefined();
        expect(task1.title).toBe("Tarefa 1");

        const task2 = await taskListService.addTaskToTaskList(taskList.id, "Tarefa 2", "Descrição da Tarefa 2");
        expect(task2).toBeDefined();
        expect(task2.title).toBe("Tarefa 2");

        const allTaskLists = await taskListService.listAllTaskLists();
        expect(allTaskLists.length).toBeGreaterThan(0);
        expect(allTaskLists.some(t => t.id === taskList.id)).toBeTruthy();

        const foundTaskList = await taskListService.getTaskListById(taskList.id);
        expect(foundTaskList).toBeDefined();
        expect(foundTaskList?.id).toBe(taskList.id);

        await taskListService.deleteTaskList(taskList.id);
        const deletedTaskList = await taskListService.getTaskListById(taskList.id);
        expect(deletedTaskList).toBeNull();

        await managerService.deleteTaskListManager(manager.id);
        const deletedManager = await managerService.getTaskListManagerById(manager.id);
        expect(deletedManager).toBeNull();
    });
});
