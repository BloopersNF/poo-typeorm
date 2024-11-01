import { TaskListManager } from "../entity/TaskListManager";
import { BaseRepo } from "./BaseRepo";

export class TaskListManagerRepo extends BaseRepo<TaskListManager> {
    constructor() {
        super(TaskListManager);
    }
};
