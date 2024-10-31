import { AppDataSource } from "./data-source";
import { Task } from "./entity/Task";
import { TaskList } from "./entity/TaskList";
import { TaskListManager } from "./entity/TaskListManager";

async function main() {
  try {
    await AppDataSource.initialize();
    
    console.log("Creating a new task list manager...");
    const taskListManager = new TaskListManager();
    console.log("TaskListManager: ", taskListManager);
    AppDataSource.manager.save(taskListManager);
    console.log("Saved a new task list manager with id: " + taskListManager.id);
    const taskList = new TaskList();
    taskList.title = "Play";
    AppDataSource.manager.save(taskList);
    console.log("Saved a new task list with id: " + taskList.id);

    taskListManager.taskLists = [taskList];

    console.log("Inserting a new task into the database...");
    const task = new Task();
    task.title = "play a game";
    task.description = "want to play a game";
    task.done = false;

    AppDataSource.manager.save(task);

    taskListManager.taskLists[0].tasks = [task];

    await AppDataSource.manager.save(taskListManager);
    console.log("Saved a new task with id: " + task.id);

    console.log("Loading tasks from the database...");
    const tasks = await AppDataSource.manager.find(Task);
    console.log("Loaded tasks: ", tasks);
    console.log("O jogo ACABOU!.");
  } catch (error) {
    console.error("Error: ", error);
  }
}

main();
