import Joi from 'joi';

export const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});

export const loginResponseSchema = Joi.object({
    token: Joi.string().required(),
    id: Joi.string().required(),
    name: Joi.string().required(),
    role: Joi.string().required()
});