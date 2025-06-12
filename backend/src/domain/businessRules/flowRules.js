import { findOneOnDatabase, updateOneOnDatabase, findManyOnDatabase, insertOnDatabase, deleteOneOnDatabase } from "../../infrastructure/drivers/mongo/adapter.js";
import { v4 as uuidv4 } from 'uuid'
import { collectionNames } from "../../infrastructure/constants/mongoConstants.js";


export async function createFlow(flowInfo, userId, userRole) {  
  try {
    if (userRole.toLowerCase() !== "gerente") {
      return { error: "Acesso negado", status: 403 };
    }

    flowInfo.name = flowInfo.name.toUpperCase();
    const query = {
      name: flowInfo.name,
    };
    const flowOnDb = await findOneOnDatabase(query, { projection: { _id: 0 } }, collectionNames.flows);

    if (flowOnDb != null) {
      return { error: "Fluxo com o mesmo nome já existe", status: 409 };
    }
    flowInfo.flowId = uuidv4();
    flowInfo.creatorId = userId;
    const jsonFlowInfo = JSON.parse(JSON.stringify(flowInfo));

    if (!jsonFlowInfo.step || jsonFlowInfo.step.length === 0) {
      return { error: "Fluxo deve conter pelo menos um passo", status: 400 };
    }
    for (const step of jsonFlowInfo.step) {
      const findResponsible = await findOneOnDatabase({ id: step.responsible },
        { projection: { _id: 0, password: 0 } }, "users");
      if (!findResponsible) {
        return { error: `Responsável para o passo ${step.name} não encontrado`, status: 404 };
      }
    }
    const response = await insertOnDatabase(jsonFlowInfo, collectionNames.flows);

    if (response.acknowledged) {
      return { message: "Fluxo criado com sucesso", flowId: flowInfo.flowId, status: 201 };
    } else {
      return { error: "Falha ao criar fluxo", status: 500 };
    }
  } catch (error) {
    return { error: "Ocorreu um erro inesperado", details: error.message, status: 500 };
  }
}

export async function getAllFlows(userRole) {
  try {
    //melhorar a regra desse acesso, por enquanto só gerente pode ver todos os fluxos
    if (userRole.toLowerCase() !== "gerente") {
      return { error: "Acesso negado", status: 403 };
    }
    const query = {};
    const flowOnDb = await findManyOnDatabase(query, { projection: { _id: 0 } }, collectionNames.flows);

    if (flowOnDb === null) {
      return { message: "Nenhum Fluxo não encontrado", status: 200 };
    }
    const jsonFlowInfo = JSON.parse(JSON.stringify(flowOnDb));

    return { message: "Fluxos encontrados", data: jsonFlowInfo, status: 200 };
  } catch (error) {
    return { error: "Ocorreu um erro inesperado", details: error.message, status: 500 };
  }
}
export async function getFlowsById(id) {
  try {
    const query = { flowId: id };
    const flowOnDb = await findOneOnDatabase(query, { projection: { _id: 0 } }, collectionNames.flows);

    if (flowOnDb === null) {
      return { message: "Fluxo não encontrado", status: 404 };
    }
    const jsonFlowInfo = JSON.parse(JSON.stringify(flowOnDb));

    return { message: "Fluxo encontrado", data: jsonFlowInfo, status: 200 };
  } catch (error) {
    return { error: "Ocorreu um erro inesperado", details: error.message, status: 500 };
  }
}


export async function deleteFlow(id, userRole) {
  try {
    if (userRole.toLowerCase() !== "gerente") {
      return { error: "Acesso negado", status: 403 };
    }
    const result = await deleteOneOnDatabase({ flowId: id }, collectionNames.flows);

    if (result.deletedCount === 0) {
      return { error: "Fluxo não encontrado", status: 404 };
    }

    return { message: "Fluxo excluído com sucesso", status: 200 };
  } catch (error) {
    return { error: "Falha ao excluir fluxo", details: error.message, status: 500 };
  }
}

export async function updateFlow(flowInfo) {
  try {
    flowInfo.name = flowInfo.name.toUpperCase();
    const query = {
      name: flowInfo.name,
    };
    const flowOnDb = await findOneOnDatabase(query, 
      { projection: { _id: 0, name: 1, flowId: 1, active:1 , flowId: 1} }, 
      collectionNames.flows);

    if (flowOnDb != null && flowOnDb.active === false) {
      return { error: "Fluxo inativo, não é possível atualizar", status: 400 };
    }

    if (flowOnDb != null && flowOnDb.flowId !== flowInfo.flowId) {
      return { error: "Já existe outro fluxo com o mesmo nome", status: 409 };
    }

    const data_update = {
      name: flowInfo.name,
      description: flowInfo.description,
      step: flowInfo.step,
      active: flowInfo.active
    };
    const jsonFlowInfo = JSON.parse(JSON.stringify(flowInfo));

    if (!jsonFlowInfo.step || jsonFlowInfo.step.length === 0) {
      return { error: "Fluxo deve conter pelo menos um passo", status: 400 };
    }
    
    for (const step of jsonFlowInfo.step) {
      const findResponsible = await findOneOnDatabase({ id: step.responsible },
        { projection: { _id: 0, password: 0 } }, collectionNames.users);
      if (!findResponsible) {
        return { error: `Responsável para o passo "${step.name}" não encontrado`, status: 404 };
      }
    }

    const result = await updateOneOnDatabase(
      { flowId: flowInfo.flowId },
      { $set: data_update },
      collectionNames.flows
    );

    if (result.acknowledged) {
      return { message: "Fluxo atualizado com sucesso", flowId: flowInfo.flowId, status: 200 };
    } else {
      return { error: "Falha ao atualizar fluxo", status: 500 };
    }
  } catch (error) {
    return { error: "Ocorreu um erro inesperado", details: error.message, status: 500 };
  }
}
