import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne } from "typeorm";
import { Task } from "./Task";
import { TaskListManager } from "./TaskListManager";

@Entity()
export class TaskList {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany(() => Task, task => task.taskList)
    tasks: Task[];

    @ManyToOne(()=> TaskListManager, taskListManager => taskListManager.taskLists)
    taskListManager: TaskListManager;
}