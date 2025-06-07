import { Router } from 'express';
import { userSchema, updateUserRuleSchema } from './domain/users/usersModel.js';
import { loginSchema } from './domain/auth/authModel.js';
import { create_user, get_user_by_email, update_user } from './domain/users/business_rules/users.js';
const router = Router();



//autentication
router.post('/auth/login', (req, res) => {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    res.json({ message: "Auth login" });
});

router.post('/auth/logout', (req, res) => {
    res.json({ message: "Auth logout" });
});

//users
router.post('/users/create', async (req, res) => {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const response_create = await create_user(value);
        if (response_create.error) {
            return res.status(response_create.status).json({ error: response_create.error });
        }
        return res.status(201).json(response_create);
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/users/:email', async (req, res) => {
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
router.patch('/users/update',async (req, res) => {
    const { error, value } = updateUserRuleSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const response = await update_user(value);

    if (response.error) {
        return res.status(response.status).json({ error: response.error });
    }

    res.json({ message: "Users update" });
});

//flow
router.post('/flow/create', (req, res) => {
    res.json({ message: "Flow create" });
});

router.get('/flow/:id', (req, res) => {
    res.json({ message: "Flow get" });
});

router.post('/flow/validate/:id', (req, res) => {
    res.json({ message: "Flow validate" });
});

router.post('/flow/compile/:id', (req, res) => {
    res.json({ message: "Flow compile" });
});


export default router;
