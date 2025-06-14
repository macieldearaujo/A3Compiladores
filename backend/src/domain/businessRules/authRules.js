import bcrypt from 'bcrypt';
import { findOneOnDatabase } from "../../infrastructure/drivers/mongo/adapter.js";
import jwt from 'jsonwebtoken';
import { loginResponseSchema } from '../models/authModel.js';
import dotenv from 'dotenv';
dotenv.config();
import { collectionNames } from '../../infrastructure/constants/mongoConstants.js';


export async function userLogin(loginInfo) {
    try {
        console.log("🚩 Dados recebidos no login:", loginInfo);


        const user = await findOneOnDatabase(
            { email: loginInfo.email },
            {},
            collectionNames.users
        );

        console.log("🚩 Usuário encontrado no banco:", user);


        if (!user) {
            return { error: "Credenciais inválidas", status: 401 };
        }

        const isMatch = await bcrypt.compare(loginInfo.password, user.password);
        console.log("🚩 Resultado do bcrypt.compare:", isMatch);

        if (!isMatch) {
            return { error: "Credenciais inválidas", status: 401 };
        }

        const token = jwt.sign(
            { id: user._id.toString(), email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const userWithId = {
            id: user._id.toString(),
            name: user.nome,
            role: user.role,
            token,
        };

        const { error, value } = loginResponseSchema.validate(userWithId);

        if (error) {
            return { error: "Erro ao retornar detalhes do token", status: 400 };
        }

        return { value, status: 200 };

    } catch (error) {
        console.error("❌ Erro geral no login:", error);
        return { error: "Falha no login", details: error.message, status: 500 };
    }
}