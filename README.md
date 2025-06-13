# A3Compiladores - Backend + Frontend

Este repositório contém o **backend** (Node.js + Express + MongoDB) e o **frontend** (ReactJS) do projeto A3Compiladores, uma aplicação para gerenciamento de usuários, fluxos e tarefas.

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/get-started) (para rodar o MongoDB facilmente)

---

## 1. Subindo o MongoDB com Docker

Execute o comando abaixo para criar e iniciar um container MongoDB chamado `mongo-corpflow`:

```bash
docker run -d \
  --name mongo-corpflow \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=123 \
  mongo:latest
```

O MongoDB ficará acessível em `mongodb://root:123@localhost:27017/`

---

## 2. Configurando o Backend

### a) Variáveis de Ambiente

Crie um arquivo `.env` dentro da pasta `backend` com o seguinte conteúdo:

```
PORT=3000
MONGO_HOST=localhost
MONGO_USERNAME=root
MONGO_PASSWORD=123
JWT_SECRET=sua_chave_secreta_aqui
```

### b) Instalação e Execução

1. Acesse a pasta do backend:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor:
   ```bash
   npm start
   ```
   O backend estará rodando em [http://localhost:3000](http://localhost:3000)

---

## 3. Configurando o Frontend

1. Abra um novo terminal e acesse a pasta do frontend:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```
   O frontend estará rodando em [http://localhost:3000](http://localhost:3000)  
   > Se as portas coincidirem, altere a porta do frontend no arquivo `.env` ou no script de inicialização.

---

## 4. Criando o banco e as collections no MongoDB

1. Acesse o terminal do MongoDB no container:
   ```bash
   docker exec -it mongo-corpflow mongosh -u root -p 123
   ```
2. Execute o script abaixo para criar o banco `corpFlow` e as collections:
   ```javascript
   use corpFlow;

   db.createCollection("usuarios");
   db.createCollection("fluxos");
   db.createCollection("tarefas");

   // (Opcional) Insira um usuário inicial
   db.usuarios.insertOne({
     nome: "Administrador",
     email: "admin@admin.com",
     senha: "senha_hash", // Substitua pelo hash real
     role: "gerente"
   });

   show collections;
   ```

---

## 5. Estrutura do Projeto

```
A3Compiladores/
├── backend/
│   ├── src/
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   └── package.json
└── README.md
```

---

## 6. Observações

- O backend utiliza autenticação JWT. O token é salvo no `localStorage` pelo frontend após o login.
- Para acessar funcionalidades de gerente ou colaborador, utilize um usuário com o respectivo papel.
- Certifique-se de que o backend está rodando antes de acessar o frontend.
- Para rotas protegidas, envie o token JWT no header `Authorization: Bearer <token>`.

