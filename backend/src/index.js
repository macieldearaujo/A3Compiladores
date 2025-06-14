import express from 'express';
import cors from 'cors';
import usersRoutes from './routes/usersRoutes.js';
import authRoutes from './routes/authRoutes.js';
import flowRoutes from './routes/flowRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/flows', flowRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(5000, () => {
    console.log("🚀 Backend rodando em http://localhost:5000")
})