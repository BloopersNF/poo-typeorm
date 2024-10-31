import { TaskList } from "../entity/TaskList";
import { BaseRepo } from "./BaseRepo";

export const TaskListManager = new BaseRepo(TaskList);
