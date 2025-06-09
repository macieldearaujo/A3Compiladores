import bcrypt from 'bcrypt';
import { find_one_on_database } from "../../../infrastructure/drivers/mongo/adapter.js";
import jwt from 'jsonwebtoken';
import { loginResponseSchema } from '../authModel.js';


export async function userLogin(loginInfo) {
    try {
        const user = await find_one_on_database(
            { email: loginInfo.email }, { projection: { _id: 0} },
            "users"
        );

        if (!user) {
            return { error: "Invalid credentials", status: 401 };
        }

        const isMatch = await bcrypt.compare(loginInfo.password, user.password);
        if (!isMatch) {
            return { error: "Invalid credentials", status: 401 };
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
            return { error: "Error to return token details", status: 400 };
        }

        return { value, status: 200 };
    } catch (error) {
        return { error: "Login failed", details: error.message, status: 500 };
    }
}