import { find_one_on_database, insert_on_database} from "../../../infrastructure/drivers/mongo/adapter.js";
import { v4 as uuidv4 } from 'uuid'


export async function create_flow(flow_info, userId) {
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
        const find_responsible = await find_one_on_database({id: step.responsible},
             { projection: { _id: 0 , password: 0} }, "users");
        if(!find_responsible) {
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
