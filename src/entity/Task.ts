import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { TaskList } from "./TaskList";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    done: boolean;

    @ManyToOne(() => TaskList, taskList => taskList.tasks)
    taskList: TaskList;

}