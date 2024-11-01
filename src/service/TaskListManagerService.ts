import { TaskListManager } from "../entity/TaskListManager";
import { TaskListManagerRepo } from "../repo/TaskListManagerRepo";

export class TaskListManagerService {
    private taskListManagerRepository: TaskListManagerRepo;

    constructor() {
        this.taskListManagerRepository = new TaskListManagerRepo();
    }

    async createTaskListManager(): Promise<TaskListManager> {
        const newManager = await this.taskListManagerRepository.create({
            taskLists: [],
        });
        return newManager;
    }

    async getTaskListManagerById(id: number): Promise<TaskListManager | null> {
        const manager = await this.taskListManagerRepository.findById(id);
        if (!manager) throw new Error(`TaskListManager com ID ${id} não encontrado.`);
        return manager;
    }

    async listAllTaskListManagers(): Promise<TaskListManager[]> {
        return this.taskListManagerRepository.findAll();
    }

    async deleteTaskListManager(id: number): Promise<void> {
        const manager = await this.getTaskListManagerById(id);
        if (!manager) throw new Error(`TaskListManager com ID ${id} não encontrado para exclusão.`);
        await this.taskListManagerRepository.delete(id);
    }
}
