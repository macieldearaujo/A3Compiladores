import Joi from "joi";

export const createFlowSchema = Joi.object({
    flowId: Joi.string().id(),
    name: Joi.string().required(),
    creatorId: Joi.string().required(),
    description: Joi.string().optional(),
    step: Joi.array().items(Joi.object(
        {
            id: Joi.string().id(),
            name: Joi.string().required(),
            responsible: Joi.string().required(),
        }
    )).required(),
    active: Joi.boolean().required()
});

/**
 * {
  "nome": "Fluxo de Aprovação de Documentos",
  "descricao": "Fluxo para aprovação de documentos internos",
  "step": [
    {
      "nome": "Revisão Inicial",
      "responsavel": "usuario123"
    },
    {
      "nome": "Aprovação Gerente",
      "responsavel": "gerente456"
    },
    {
      "nome": "Publicação",
      "responsavel": "usuario789"
    }
  ],
  "ativo": true
}
 */