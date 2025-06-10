import { Router } from 'express';
import { createTaskSchema, updateTaskSchema} from '../domain/models/taskModel.js';
import { createTask, getAllTasks, updateStatusTask } from '../domain/businessRules/taskRules.js';
import { authenticate, verifyManager } from '../domain/validations/validateAuth.js';

const taskRoutes = Router();


taskRoutes.post('/create', authenticate, verifyManager, async (req, res) => {
    // rota acessivel para o gerente
    const { error } = createTaskSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const response = await createTask(req.body, req.user.id, req.user.role);
        if (response.error) {
            return res.status(response.status).json({ error: response.error });
        }
        return res.status(201).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

taskRoutes.get('/', authenticate, async (req, res) => {
    // rota acessivel para usuarios autenticados, lista todas as tarefas
    try {
        const response = await getAllTasks(req.user.id, req.user.role);
        if (response.error) {
            return res.status(response.status).json({ error: response.error });
        }
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

taskRoutes.patch('/:id', authenticate, async (req, res) => {
    // rota acessivel para usuarios autenticados, atualiza o status da tarefa
    const { error } = updateTaskSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const response = await updateStatusTask(req.params.id, req.body, req.user.id, req.user.role);
        if (response.error) {
            return res.status(response.status).json({ error: response.error });
        }
        return res.status(201).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export default taskRoutes;