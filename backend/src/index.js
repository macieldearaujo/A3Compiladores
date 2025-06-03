import express from 'express';
import cors from 'cors';
import routes from './routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.listen(5000, () => {
    console.log("🚀 Backend rodando em http://localhost:5000")
})