# A3Compiladores - Backend

Este é o backend de uma aplicação de gerenciamento de usuários, autenticação, fluxos e tarefas, desenvolvido em Node.js com Express e MongoDB.

## Funcionalidades

- Cadastro, listagem, atualização e remoção de usuários
- Autenticação com JWT
- Controle de acesso por perfil (gerente, colaborador)
- Gerenciamento de fluxos e tarefas
- Validação de dados com Joi

## Estrutura de Pastas

```
backend/
├── src/
│   ├── domain/
│   │   ├── businessRules/
│   │   ├── models/
│   │   └── validations/
│   ├── infrastructure/
│   │   └── drivers/
│   │       └── mongo/
│   ├── routes/
│   └── index.js
├── .env
└── package.json
```

## Variáveis de Ambiente

Crie um arquivo `.env` dentro da pasta `backend` com o seguinte conteúdo:

```
PORT=3000
MONGO_HOST=localhost
MONGO_USERNAME=root
MONGO_PASSWORD=123
JWT_SECRET=sua_chave_secreta_aqui
```

## Instalação

1. Instale as dependências:
   ```sh
   npm install
   ```

2. Inicie o servidor:
   ```sh
   node src/index.js
   ```

## Endpoints

### Usuários
- `POST /api/users/create` — Cria um novo usuário
- `GET /api/users/:id` — Busca usuário por ID (apenas gerente)
- `GET /api/users/` — Lista todos os usuários (apenas gerente)
- `PATCH /api/users/update` — Atualiza usuário (apenas gerente)
- `DELETE /api/users/:id` — Remove usuário (apenas gerente)

### Autenticação
- `POST /api/auth/login` — Login de usuário
- `POST /api/auth/logout` — Logout

### Fluxos
- `POST /api/flows/create` — Cria um novo fluxo (apenas gerente)
- `GET /api/flows/:id` — Busca fluxo por ID
- `GET /api/flows/` — Lista todos os fluxos
- `PATCH /api/flows/update` — Atualiza fluxo (apenas gerente)
- `DELETE /api/flows/:id` — Remove fluxo (apenas gerente)

### Tarefas
- `POST /api/tasks/create` — Cria uma nova tarefa
- `GET /api/tasks/:id` — Busca tarefa por ID
- `GET /api/tasks/` — Lista todas as tarefas
- `PATCH /api/tasks/update` — Atualiza tarefa
- `DELETE /api/tasks/:id` — Remove tarefa


## Tecnologias

- Node.js
- Express
- MongoDB (driver nativo)
- JWT (`jsonwebtoken`)
- Joi (validação)
- dotenv

## Observações

- O projeto utiliza ES Modules (`"type": "module"` no `package.json`).
- Certifique-se de que o MongoDB está rodando e as credenciais estão corretas no `.env`.
- Para rotas protegidas, envie o token JWT no header `Authorization: Bearer <token>`.
