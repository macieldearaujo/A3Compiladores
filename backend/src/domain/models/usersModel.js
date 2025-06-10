import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Joi from 'joi';


export const userSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('Gerente', 'Colaborador').required(),
  });

export const updateUserRuleSchema = Joi.object({
  email: Joi.string().email().required(),
  role: Joi.string().valid('Gerente', 'Colaborador').required(),
});

export const userInfoSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.string().required(),
});
