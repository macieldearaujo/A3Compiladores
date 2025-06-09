import Joi from "joi";

export const createTaskSchema = Joi.object({
    taskId: Joi.string().id(),
    description: Joi.string().optional(),
    responsible: Joi.string().required(),
    status: Joi.string().valid('pendente', 'em andamento', 'concluída').required(),
    deadline: Joi.date().iso().required(),
    flowId: Joi.string().id().required(),
    creatorId: Joi.string().id().required(),
});




/**

{
  "titulo": "Revisar documento de política interna",
  "descricao": "Verificar os detalhes e sugerir melhorias no documento",
  "responsavel": "usuario123",
  "status": "pendente",
  "prazo": "2025-06-15T23:59:59.000Z",
  "fluxoId": "abc123def456"
}

 */