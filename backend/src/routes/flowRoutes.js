import { Router } from 'express';
import { createFlow, getAllFlows, getFlowsById, deleteFlow, updateFlow } from '../domain/businessRules/flowRules.js';
import { createFlowSchema, updateFlowSchema } from '../domain/models/flowModel.js';
import { authenticate, verifyManager } from '../domain/validations/validateAuth.js';

const flowRoutes = Router();


flowRoutes.post('/create', authenticate, verifyManager, async (req, res) => {
    // rota acessivel para o gerente, criacao de um novo fluxo
    const { error } = createFlowSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const response = await createFlow(req.body, req.user.id, req.user.role);
        if (response.error) {
            return res.status(response.status).json({ error: response.error });
        }
        return res.status(201).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

flowRoutes.get('/',authenticate, async (req, res) => {
    // rota acessivel a usuarios autenticados, permite ver todos os fluxos do usuario, 
    // no caso de gerente todos os fluxos
    try {
        const response = await getAllFlows(req.user.role);
        if (response.error) {
            return res.status(response.status).json({ error: response.error });
        }
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

flowRoutes.get('/:id', authenticate, verifyManager, async (req, res) => {
    // rota acessivel para o gerente, permite ver um fluxo por id
    try {
        const response = await getFlowsById(req.params.id);
        if (response.error) {
            return res.status(response.status).json({ error: response.error });
        }
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

flowRoutes.put('/:id', authenticate, verifyManager, async (req, res) => {
    // rota acessivel para o gerente, permite atualizar um fluxo por id
    const { error } = updateFlowSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const response = await updateFlow(req.body);
        if (response.error) {
            return res.status(response.status).json({ error: response.error });
        }
        return res.status(201).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

flowRoutes.delete('/:id', authenticate, verifyManager, async (req, res) => {
    // rota acessivel para o gerente, permite deletar um fluxo por id
    try {
        const response = await deleteFlow(req.params.id, req.user.role);

        if (response.error) {
            return res.status(response.status).json({ error: response.error });
        }

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export default flowRoutes;
