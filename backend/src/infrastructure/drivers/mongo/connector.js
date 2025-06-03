import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

export async function mongoConnector() {
    const host = process.env.MONGO_HOST;
    const username = process.env.MONGO_USERNAME;
    const password = process.env.MONGO_PASSWORD;
    const uri = `mongodb+srv://${username}:${password}@${host}:27017`;

    return new MongoClient(uri);
}
