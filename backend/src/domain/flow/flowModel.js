import Joi from "joi";

export const createFlowSchema = Joi.object({
    id: Joi.string().id(),
    name: Joi.string().required(),
    creatorId: Joi.string().required(),
    bloc: Joi.array().items(Joi.object(
        {
            id: Joi.string().id(),
            type: Joi.string().valid("TO DO", "VERIFY", "APPROVE"),
            drecription: Joi.string().required(),
            term: Joi.date(),
            connections: Joi.array()
        }
    ))
});

