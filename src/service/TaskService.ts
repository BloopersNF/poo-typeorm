import { Task } from "../entity/Task";
import { TaskRepo } from "../repo/TaskRepo";

export class TaskService {
    private TaskRepo: TaskRepo;

    constructor() {
        this.TaskRepo = new TaskRepo();
    }

    async createTask(title: string, description: string): Promise<Task> {
        // Validação simples
        if (!title || !description) {
            throw new Error("O título e a descrição são obrigatórios.");
        }

        const newTask = await this.TaskRepo.create({
            title,
            description,
            done: false,
        });

        return newTask;
    }

    async getTaskById(id: number): Promise<Task | null> {
        const task = await this.TaskRepo.findById(id);

        if (!task) {
            throw new Error(`Tarefa com ID ${id} não encontrada.`);
        }

        return task;
    }

    async updateTask(id: number, updates: Partial<Task>): Promise<Task | null> {
        const task = await this.getTaskById(id);

        if (!task) {
            throw new Error(`Tarefa com ID ${id} não encontrada para atualização.`);
        }

        const updatedTask = await this.TaskRepo.update(id, updates);
        return updatedTask;
    }

    async deleteTask(id: number): Promise<void> {
        const task = await this.getTaskById(id);

        if (!task) {
            throw new Error(`Tarefa com ID ${id} não encontrada para exclusão.`);
        }

        await this.TaskRepo.delete(id);
    }

    async listAllTasks(): Promise<Task[]> {
        return this.TaskRepo.findAll();
    }

    async listPendingTasks(): Promise<Task[]> {
        return this.TaskRepo.findPendingTasks();
    }
}
