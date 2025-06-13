import { findOneOnDatabase, insertOnDatabase, findManyOnDatabase, updateOneOnDatabase } from "../../infrastructure/drivers/mongo/adapter.js";
import { v4 as uuidv4 } from 'uuid'
import { collectionNames } from "../../infrastructure/constants/mongoConstants.js"; 
export async function createTask(taskInfo, userId, userRole) {
    try {
        if (userRole.toLowerCase() !== "gerente") {
            return { error: "Acesso negado", status: 403 };
        }

        const flow = await findOneOnDatabase(
            { flowId: taskInfo.flowId },
            { projection: { _id: 0 } },
            collectionNames.flows
        );

        if (!flow) {
            return { error: "Fluxo não encontrado", status: 404 };
        }

        const step = flow.step.find(
            (s) => s.id === taskInfo.stepId && s.name === taskInfo.stepName
        );

        if (!step) {
            return { error: "Etapa do fluxo inválida ou não encontrada", status: 400 };
        }

        const tarefaExistente = await findOneOnDatabase(
            {
                flowId: taskInfo.flowId,
                stepId: taskInfo.stepId,
                responsible: taskInfo.responsible,
                status: { $in: ["pendente", "em andamento"] },
            },
            { projection: { _id: 0 } },
            collectionNames.tasks
        );

        if (tarefaExistente) {
            return {
                error: "Já existe uma tarefa pendente ou em andamento para essa etapa e responsável",
                status: 409,
            };
        }

        taskInfo.taskId = uuidv4();
        const jsonTask = JSON.parse(JSON.stringify(taskInfo));

        const response = await insertOnDatabase(jsonTask, collectionNames.tasks);

        if (response.acknowledged) {
            return {
                message: "Tarefa criada com sucesso",
                taskId: taskInfo.taskId,
                status: 201,
            };
        } else {
            return { error: "Falha ao criar tarefa", status: 500 };
        }
    } catch (error) {
        console.error("Erro ao criar tarefa:", error);
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