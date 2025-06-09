import e, { Router } from 'express';

const taskRoutes = Router();


taskRoutes.post('/create', async (req, res) => {
     // rota acessivel para o gerente
    //const { error } = validateUser(req.body);
    //if (error) {
    //    return res.status(400).json({ error: error.details[0].message });
    //}
    try {
        //const response_create = await create_user(req.body);
        //if (response_create.error) {
        //    return res.status(response_create.status).json({ error: response_create.error });
        //}
        return res.status(201).json(response_create);
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});
/*
taskRoutes.get('/', async (req, res) => {
     // rota acessivel para usuarios autenticados
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
taskRoutes.get('/:id/status', async (req, res) => {
     // rota acessivel para usuarios autenticados
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
export default taskRoutes;
/**
 * | Método | Rota          | Ação                       | Acesso      |
| ------ | ------------- | -------------------------- | ----------- |
| GET    | `/`           | Listar todas as tarefas    | Autenticado |
| POST   | `/`           | Criar nova tarefa          | **Gerente** |
| PATCH  | `/:id/status` | Atualizar status da tarefa | Autenticado |

 */