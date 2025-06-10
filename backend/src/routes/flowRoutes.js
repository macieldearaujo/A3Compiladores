import { Router } from 'express';
import { createFlow, getAllFlows, getFlowsById, deleteFlow, updateFlow } from '../domain/flow/businessRules/flowBusiness.js';
import { createFlowSchema, updateFlowSchema } from '../domain/flow/flowModel.js';
import { authenticate, verifyManager } from '../domain/auth/validateAuth.js';

const flowRoutes = Router();


flowRoutes.post('/create', authenticate, verifyManager, async (req, res) => {
    // rota acessivel para o gerente, criacao de um novo fluxo
    const { error } = createFlowSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const response = await createFlow(req.body, req.user.id);
        if (response.error) {
            return res.status(response.status).json({ error: response.error });
        }
        return res.status(201).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

flowRoutes.get('/', async (req, res) => {
    // rota acessivel a usuarios autenticados, permite ver todos os fluxos
    try {
        const response = await getAllFlows();
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
        const response = await deleteFlow(req.params.id);

        if (response.error) {
            return res.status(response.status).json({ error: response.error });
        }

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

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