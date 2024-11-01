import { TaskList } from "../entity/TaskList";
import { BaseRepo } from "./BaseRepo";

export class TaskListRepo extends BaseRepo<TaskList> {
    constructor() {
        super(TaskList);
    }
};
