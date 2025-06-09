import { Router } from 'express';
import { userSchema, validateUser, updateUserRuleSchema } from '../domain/users/usersModel.js';
import { create_user, get_user_by_email, update_user, delete_user } from '../domain/users/business_rules/users.js';

const usersRoutes = Router();

//users
usersRoutes.post('/create', async (req, res) => {
     // rota acessivel para todos os usuarios, mas somente o gerente pode definir o perfil para gerente em novos usuarios
    const { error } = validateUser(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const response_create = await create_user(req.body);
        if (response_create.error) {
            return res.status(response_create.status).json({ error: response_create.error });
        }
        return res.status(201).json(response_create);
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

usersRoutes.get('/:email', async (req, res) => {
    // rota acessivel somente para o gerente!
    try {
        const response = await get_user_by_email(req.params.email);

        if (response.error) {
            return res.status(response.status).json({ error: response.error });
        }

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});
/*
router.get('/users/list', (req, res) => {
    res.json({ message: "Users list" });
});
*/
usersRoutes.patch('/update',async (req, res) => {
    // rota acessivel somente para o gerente?!
    const { error, value } = updateUserRuleSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const response = await update_user(value);

    if (response.error) {
        return res.status(response.status).json({ error: response.error });
    }

    return res.status(200).json({ message: "User updated successfully" });
});

usersRoutes.delete('/:email', async (req, res) => {
    // rota acessivel somente para o gerente!
    try {
        const response = await delete_user(req.params.email);

        if (response.error) {
            return res.status(response.status).json({ error: response.error });
        }

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export default usersRoutes;