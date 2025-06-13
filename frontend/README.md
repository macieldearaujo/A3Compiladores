# A3Compiladores - Frontend

Este projeto é o frontend da aplicação A3Compiladores, desenvolvido em ReactJS.

## Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/A3Compiladores.git
   ```
2. Acesse a pasta do frontend:
   ```bash
   cd A3Compiladores/frontend
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
   ou
   ```bash
   yarn
   ```

## Scripts Disponíveis

- `npm start` ou `yarn start`  
  Inicia o servidor de desenvolvimento em [http://localhost:3000](http://localhost:3000).

- `npm run build` ou `yarn build`  
  Gera uma versão otimizada para produção na pasta `build`.

- `npm test` ou `yarn test`  
  Executa os testes automatizados.

## Estrutura do Projeto

```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## Configuração de Ambiente

- Certifique-se de que o backend está rodando e configurado para aceitar requisições do frontend.
- Configure variáveis de ambiente, se necessário, em um arquivo `.env`.

## Tecnologias Utilizadas

- ReactJS
- TailwindCSS
- Axios
- React Router DOM

## Observações

- O projeto utiliza autenticação JWT. O token é salvo no `localStorage` após o login.
- Para acessar funcionalidades de gerente ou colaborador, utilize um usuário com o respectivo papel.
