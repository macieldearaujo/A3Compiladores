import bcrypt from 'bcrypt';
import { findOneOnDatabase } from "../../infrastructure/drivers/mongo/adapter.js";
import jwt from 'jsonwebtoken';
import { loginResponseSchema } from '../models/authModel.js';
import { collectionNames } from '../../infrastructure/constants/mongoConstants.js';


export async function userLogin(loginInfo) {
    try {
        const user = await findOneOnDatabase(
            { email: loginInfo.email }, { projection: { _id: 0} },
            collectionNames.users
        );

        if (!user) {
            return { error: "Credenciais inválidas", status: 401 };
        }

        const isMatch = await bcrypt.compare(loginInfo.password, user.password);
        if (!isMatch) {
            return { error: "Credenciais inválidas", status: 401 };
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role }, // payload
            "ifSMpRAq50TBF9eg6RAs0wv3ikbfHIhg",//process.env.JWT_SECRET
            { expiresIn: '1h' }
        );
        user.token = token;
        delete user.password;
        delete user.email;
        const { error, value } = loginResponseSchema.validate(user);

        if (error) {
            return { error: "Erro ao retornar detalhes do token", status: 400 };
        }

        return { value, status: 200 };
    } catch (error) {
        return { error: "Falha no login", details: error.message, status: 500 };
    }
}