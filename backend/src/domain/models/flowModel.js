import Joi from "joi";

export const createFlowSchema = Joi.object({
    flowId: Joi.string().id(),
    name: Joi.string().required(),
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

export const updateFlowSchema = Joi.object({
    flowId: Joi.string().id().required(),
    name: Joi.string().required(),
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
