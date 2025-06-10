import { findOneOnDatabase, insertOnDatabase, findManyOnDatabase,  updateOneOnDatabase } from "../../infrastructure/drivers/mongo/adapter.js";
import { v4 as uuidv4 } from 'uuid'

export async function createTask(taskInfo, userId, userRole) {
    try {
        if (userRole.toLowerCase() !== "gerente") {
            return { error: "Acesso negado", status: 403 };
        }
        
        taskInfo.title = taskInfo.title.toUpperCase();
        const query = {
            title: taskInfo.title,
        };
        const taskOnDb = await findOneOnDatabase(query, { projection: { _id: 0 } }, "tasks");

        if (taskOnDb != null) {
            return { error: "Tarefa com o mesmo nome já existe", status: 409 };
        }
        taskInfo.taskId = uuidv4();
        taskInfo.createdBy = userId;
        taskInfo.updatedAt = new Date().toISOString().split('.')[0] + 'Z';
        const json_task_info = JSON.parse(JSON.stringify(taskInfo));

        const find_flow = await findOneOnDatabase({ flowId: taskInfo.flowId }, { projection: { _id: 0 } }, "flows");
        if (!find_flow) {
            return { error: `Fluxo não encontrado`, status: 404 };
        }
        const find_responsible = await findOneOnDatabase({ id: taskInfo.responsible }, { projection: { _id: 0, password: 0 } }, "users");
        if (!find_responsible) {
            return { error: `Responsável não encontrado`, status: 404 };
        }

        const response = await insertOnDatabase(json_task_info, "tasks");

        if (response.acknowledged) {
            return { message: "Tarefa criada com sucesso", taskId: taskInfo.taskId, status: 201 };
        } else {
            return { error: "Falha ao criar tarefa", status: 500 };
        }
    } catch (error) {
        return { error: "Ocorreu um erro inesperado", details: error.message, status: 500 };
    }
}

export async function getAllTasks(userId, userRole) {
    try {
        const query = {};
        if (userRole.toLowerCase() !== "gerente") {
            query.responsible = userId;
        }

        const tasksOnDb = await findManyOnDatabase(query, { projection: { _id: 0 } }, "tasks");

        if (tasksOnDb === null) {
            return { message: "Nenhuma tarefa encontrada", status: 200 };
        }
        const jsonTasksInfo = JSON.parse(JSON.stringify(tasksOnDb));

        return { message: "Tarefas encontradas", data: jsonTasksInfo, status: 200 };
    } catch (error) {
        return { error: "Ocorreu um erro inesperado", details: error.message, status: 500 };
    }
}

export async function updateStatusTask(id, newStatus, userId, userRole) {
    try {
        const query = {
            taskId: id,
        };

        const taskOnDb = await findOneOnDatabase(query, { projection: { _id: 0 } }, "tasks");

        if (taskOnDb === null) {
            return { message: "Nenhuma tarefa encontrada", status: 200 };
        }
        if (taskOnDb.responsible !== userId && userRole.toLowerCase() !== "gerente") {
            return { error: "Você não tem permissão para atualizar esta tarefa", status: 403 };
        }
        if (taskOnDb.status === "concluída" && newStatus.status !== "concluída") {
            return { error: "Tarefa já concluída, não é possível alterar o status", status: 400 };
        }
        const updateData = {
            status: newStatus.status,
            updatedAt: new Date().toISOString().split('.')[0] + 'Z',
        };

        const result = await updateOneOnDatabase(
            query,
            { $set: updateData },
            "tasks"
        );

        if (result.acknowledged) {
            return { message: "Tarefa atualizada com sucesso", taskId: id, status: 200 };
        } else {
            return { error: "Falha ao atualizar tarefa", status: 500 };
        }
    } catch (error) {
        return { error: "Ocorreu um erro inesperado", details: error.message, status: 500 };
    }
}