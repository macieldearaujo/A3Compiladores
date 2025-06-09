import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Joi from 'joi';

export const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Gerente', 'Colaborador'], required: true },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.validatePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export const validateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('Gerente', 'Colaborador').required(),
  });

  return schema.validate(data);
};

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
