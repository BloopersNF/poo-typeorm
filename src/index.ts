import { AppDataSource } from "./data-source";
import { TaskRepo } from "./repo/TaskRepo";

async function main() {
    try {
        await AppDataSource.initialize();
        // 1. Testando a criação de uma nova tarefa
        const newTask = await TaskRepo.create({
            title: "Estudar TypeORM",
            description: "Revisar CRUD e DataSource",
            done: false
        });
        console.log("Tarefa criada:", newTask);

        // 2. Buscando a tarefa pelo ID
        const foundTask = await TaskRepo.findById(newTask.id);
        console.log("Tarefa encontrada:", foundTask);

        // 3. Atualizando a tarefa
        const updatedTask = await TaskRepo.update(newTask.id, { done: true });
        console.log("Tarefa atualizada:", updatedTask);

        // 4. Listando todas as tarefas
        const allTasks = await TaskRepo.findAll();
        console.log("Todas as tarefas:", allTasks);

        // 5. Excluindo a tarefa
        await TaskRepo.delete(newTask.id);
        const deletedTask = await TaskRepo.findById(newTask.id);
        console.log("Tarefa após exclusão (deve ser null):", deletedTask);
    } catch (error) {
        console.error("Error: ", error);
    }
}

main();
