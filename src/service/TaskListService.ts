import { Task } from "../entity/Task";
import { TaskList } from "../entity/TaskList";
import { TaskListRepo } from "../repo/TaskListRepo";
import { TaskService } from "./TaskService";

export class TaskListService {
    private taskListRepository: TaskListRepo;
    private taskService: TaskService;

    constructor() {
        this.taskListRepository = new TaskListRepo();
        this.taskService = new TaskService();
    }

    async createTaskList(title: string): Promise<TaskList> {
        if (!title) throw new Error("O título é obrigatório.");

        const newTaskList = await this.taskListRepository.create({
            title,
            tasks: [],
        });

        return newTaskList;
    }

    async addTaskToTaskList(taskListId: number, title: string, description: string): Promise<Task> {
        const taskList = await this.getTaskListById(taskListId);

        const newTask = await this.taskService.createTask(title, description);

        newTask.taskList = taskList;

        await this.taskService.updateTask(newTask.id, { taskList: newTask.taskList });

        return newTask;
    }

    async getTaskListById(id: number): Promise<TaskList | null> {
        const taskList = await this.taskListRepository.findById(id);
        if (!taskList) throw new Error(`TaskList com ID ${id} não encontrada.`);
        return taskList;
    }

    async listAllTaskLists(): Promise<TaskList[]> {
        return this.taskListRepository.findAll();
    }

    async deleteTaskList(id: number): Promise<void> {
        const taskList = await this.getTaskListById(id);
        if (!taskList) throw new Error(`TaskList com ID ${id} não encontrada para exclusão.`);
        await this.taskListRepository.delete(id);
    }
}
