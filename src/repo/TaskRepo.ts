import { Task } from "../entity/Task";
import { BaseRepo } from "./BaseRepo";

export class TaskRepo extends BaseRepo<Task> {
    constructor() {
        super(Task);
    }

    async findPendingTasks(): Promise<Task[]> {
        return this.repository.find({ where: { done: false } });
    }
};
