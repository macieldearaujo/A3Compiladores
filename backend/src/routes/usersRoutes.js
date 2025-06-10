import { Router } from 'express';
import { userSchema, updateUserRuleSchema } from '../domain/models/usersModel.js';
import { createUser, getUserById, updateUser, deleteUser, getAllUsers } from '../domain/businessRules/usersRules.js';
import { authenticate, verifyManager } from '../domain/validations/validateAuth.js';

const usersRoutes = Router();

usersRoutes.post('/create', async (req, res) => {
    // rota acessivel para todos os usuarios
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const response = await createUser(req.body);
        if (response.error) {
            return res.status(response.status).json({ error: response.error });
        }
        return res.status(201).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

usersRoutes.get('/:id', authenticate, verifyManager, async (req, res) => {
    // rota acessivel somente para o gerente!
    try {
        const response = await getUserById(req.params.id, req.user.role);

        if (response.error) {
            return res.status(response.status).json({ error: response.error });
        }

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

usersRoutes.get('/', authenticate, verifyManager, async (req, res) => {
    // rota acessivel somente para o gerente, lista todos os usuarios
    try {
        const response = await getAllUsers(req.user.role);
        if (response.error) {
            return res.status(response.status).json({ error: response.error });
        }
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

usersRoutes.patch('/update', authenticate, verifyManager, async (req, res) => {
    // rota acessivel somente para o gerente
    const { error } = updateUserRuleSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const response = await updateUser(req.body, req.user.role);

    if (response.error) {
        return res.status(response.status).json({ error: response.error });
    }

    return res.status(200).json({ message: "Usuario atualizado com sucesso" });
});

usersRoutes.delete('/:id', authenticate, verifyManager, async (req, res) => {
    // rota acessivel somente para o gerente!
    try {
        const response = await deleteUser(req.params.id, req.user.role);

        if (response.error) {
            return res.status(response.status).json({ error: response.error });
        }

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export default usersRoutes;