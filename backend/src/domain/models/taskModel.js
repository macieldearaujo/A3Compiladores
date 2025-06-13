import Joi from "joi";
export const createTaskSchema = Joi.object({
  taskId: Joi.string().id(),
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().optional(),
  responsible: Joi.string().required(),
  status: Joi.string().valid('pendente', 'em andamento', 'concluída').required(),
  deadline: Joi.date().iso().required(),
  flowId: Joi.string().id().required(),
  stepId: Joi.string().id().required(),
  stepName: Joi.string().required(),
  creatorId: Joi.string().id()
});


export const updateTaskSchema = Joi.object({
    status: Joi.string().valid('pendente', 'em andamento', 'concluída').required()
});
