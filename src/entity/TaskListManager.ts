import { Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { TaskList } from "./TaskList";

@Entity()
export class TaskListManager {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => TaskList, taskList => taskList.taskListManager)
    taskLists: TaskList[];
}
