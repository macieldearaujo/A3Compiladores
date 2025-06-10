import { find_one_on_database, insert_on_database, find_many_on_database, delete_one_on_database, update_one_on_database } from "../../../infrastructure/drivers/mongo/adapter.js";
import { v4 as uuidv4 } from 'uuid'


export async function createFlow(flow_info, userId) {
  try {
    flow_info.name = flow_info.name.toUpperCase();
    const query = {
      name: flow_info.name,
    };
    const flow_on_db = await find_one_on_database(query, { projection: { _id: 0 } }, "flows");

    if (flow_on_db != null) {
      return { error: "Fluxo com o mesmo nome já existe", status: 409 };
    }
    flow_info.flowId = uuidv4();
    flow_info.createdBy = userId;
    const json_flow_info = JSON.parse(JSON.stringify(flow_info));

    if (!json_flow_info.step || json_flow_info.step.length === 0) {
      return { error: "Fluxo deve conter pelo menos um passo", status: 400 };
    }
    for (const step of json_flow_info.step) {
      const find_responsible = await find_one_on_database({ id: step.responsible },
        { projection: { _id: 0, password: 0 } }, "users");
      if (!find_responsible) {
        return { error: `Responsável para o passo ${step.name} não encontrado`, status: 404 };
      }
    }
    const response = await insert_on_database(json_flow_info, "flows");

    if (response.acknowledged) {
      return { message: "Fluxo criado com sucesso", flowId: flow_info.flowId, status: 201 };
    } else {
      return { error: "Falha ao criar fluxo", status: 500 };
    }
  } catch (error) {
    return { error: "Ocorreu um erro inesperado", details: error.message, status: 500 };
  }
}

export async function getAllFlows() {
  try {
    const query = {};
    const flow_on_db = await find_many_on_database(query, { projection: { _id: 0 } }, "flows");

    if (flow_on_db === null) {
      return { message: "Nenhum Fluxo não encontrado", status: 200 };
    }
    const json_flow_info = JSON.parse(JSON.stringify(flow_on_db));

    return { message: "Fluxos encontrados", data: json_flow_info, status: 200 };
  } catch (error) {
    return { error: "Ocorreu um erro inesperado", details: error.message, status: 500 };
  }
}
export async function getFlowsById(id) {
  try {
    const query = { flowId: id };
    const flow_on_db = await find_one_on_database(query, { projection: { _id: 0 } }, "flows");

    if (flow_on_db === null) {
      return { message: "Fluxo não encontrado", status: 404 };
    }
    const json_flow_info = JSON.parse(JSON.stringify(flow_on_db));

    return { message: "Fluxo encontrado", data: json_flow_info, status: 200 };
  } catch (error) {
    return { error: "Ocorreu um erro inesperado", details: error.message, status: 500 };
  }
}


export async function deleteFlow(id) {
  try {
    const result = await delete_one_on_database({ flowId: id }, "flows");

    if (result.deletedCount === 0) {
      return { error: "Fluxo não encontrado ou já excluído", status: 404 };
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
    const flowOnDb = await find_one_on_database(query, { projection: { _id: 0, name: 1, flowId: 1 } }, "flows");

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
      const findResponsible = await find_one_on_database({ id: step.responsible },
        { projection: { _id: 0, password: 0 } }, "users");
      if (!findResponsible) {
        return { error: `Responsável para o passo ${step.name} não encontrado`, status: 404 };
      }
    }

    const result = await update_one_on_database(
      { id: jsonFlowInfo.id },
      { $set: data_update },
      "flows"
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
