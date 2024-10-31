import "reflect-metadata"
import { DataSource } from "typeorm"
import { Task } from "./entity/Task"
import { TaskList } from "./entity/TaskList"
import { TaskListManager } from "./entity/TaskListManager"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "sua_senha",
    database: "mysql",
    synchronize: true,
    logging: false,
    entities: [Task, TaskList, TaskListManager],
    migrations: [],
    subscribers: [],
})
