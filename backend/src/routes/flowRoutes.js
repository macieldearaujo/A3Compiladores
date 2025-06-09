import { Router } from 'express';
import {create_flow } from '../domain/flow/businessRules/flowBusiness.js';
import { createFlowSchema } from '../domain/flow/flowModel.js';
import { authenticate, verifyManager }  from '../domain/auth/validateAuth.js';

const flowRoutes = Router();


flowRoutes.post('/create', authenticate, verifyManager, async (req, res) => {
    // rota acessivel para o gerente, criacao de um novo fluxo
    const { error } = createFlowSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const response_create = await create_flow(req.body, req.user.id);
        if (response_create.error) {
            return res.status(response_create.status).json({ error: response_create.error });
        }
        return res.status(201).json(response_create);
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});
/*
flowRoutes.get('/', async (req, res) => {
    // rota acessivel a usuarios autenticados, permite acessar todos os fluxos
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

flowRoutes.get('/:id', async (req, res) => {
     // rota acessivel para o gerente pode definir o perfil para gerente em novos usuarios
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

flowRoutes.put('/:id', async (req, res) => {
     // rota acessivel para o gerente pode definir o perfil para gerente em novos usuarios
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

flowRoutes.delete('/:id', async (req, res) => {
     // rota acessivel para o gerente pode definir o perfil para gerente em novos usuarios
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
*/
export default flowRoutes;
/**
 * 
 * | Método | Rota   | Ação                   | Acesso      |
| ------ | ------ | ---------------------- | ----------- |
| POST   | `/`    | Criar novo fluxo       | **Gerente** |
| GET    | `/`    | Listar todos os fluxos | Autenticado |
| GET    | `/:id` | Buscar fluxo por ID    | **Gerente** |
| PUT    | `/:id` | Atualizar fluxo por ID | **Gerente** |
| DELETE | `/:id` | Deletar fluxo por ID   | **Gerente** |

 */