import Joi from 'joi';

export const userSchema = Joi.object({
    id: Joi.string(),
    name: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().required()

});

export const updateUserRuleSchema = Joi.object({
    email: Joi.string().required(),
    role: Joi.string().required()
});

export const userInfoSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().required()
});
