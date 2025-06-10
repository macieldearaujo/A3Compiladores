import { Router } from 'express';
import { loginSchema } from '../domain/models/authModel.js';
import { userLogin } from '../domain/businessRules/authRules.js';


const authRoutes = Router();

authRoutes.post('/login', async (req, res) => {
    // rota acessivel para todos
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    try {
        const response_create = await userLogin(req.body);
        if (response_create.error) {
            return res.status(response_create.status).json({ error: response_create.error });
        }
        return res.status(200).json(response_create);
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

authRoutes.post('/logout', (req, res) => {
    // rota acessivel para todos
    res.json({ message: "Logout successful" });
});

export default authRoutes;
