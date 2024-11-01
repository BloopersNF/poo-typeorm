import { AppDataSource } from "./data-source";
import { TaskListManagerService } from "./service/TaskListManagerService";
import { TaskListService } from "./service/TaskListService";

async function main() {
    try {
        await AppDataSource.initialize();
        const taskListService = new TaskListService();
        const managerService = new TaskListManagerService();

        // 1. Criando um novo TaskListManager
        const manager = await managerService.createTaskListManager();
        console.log("TaskListManager criado:", manager);

        // 2. Criando um TaskList associado ao TaskListManager
        const taskList = await taskListService.createTaskList("Lista de Tarefas Importantes");
        console.log("TaskList criado:", taskList);

        // 3. Adicionando tarefas ao TaskList
        const task1 = await taskListService.addTaskToTaskList(taskList.id, "Tarefa 1", "Descrição da Tarefa 1");
        console.log("Tarefa adicionada ao TaskList:", task1);

        const task2 = await taskListService.addTaskToTaskList(taskList.id, "Tarefa 2", "Descrição da Tarefa 2");
        console.log("Tarefa adicionada ao TaskList:", task2);

        // 4. Listando todas as TaskLists
        const allTaskLists = await taskListService.listAllTaskLists();
        console.log("Todas as TaskLists:", allTaskLists);

        // 5. Buscando um TaskList pelo ID
        const foundTaskList = await taskListService.getTaskListById(taskList.id);
        console.log("TaskList encontrada pelo ID:", foundTaskList);

        // 6. Excluindo o TaskList
        await taskListService.deleteTaskList(taskList.id);
        console.log("TaskList excluída com sucesso");

        // 7. Excluindo o TaskListManager
        await managerService.deleteTaskListManager(manager.id);
        console.log("TaskListManager excluído com sucesso");

        await AppDataSource.destroy();
    } catch (error) {
        console.error("Error: ", error);
    }
}

main();
