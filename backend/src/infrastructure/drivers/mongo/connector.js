import dotenv from 'dotenv';

dotenv.config({ path: '../../../.env' });
import { MongoClient } from 'mongodb';


export async function mongoConnector() {
    const host = process.env.MONGO_HOST || "localhost";
    const username = process.env.MONGO_USERNAME || "root";
    const password = process.env.MONGO_PASSWORD || "123";
    const uri = `mongodb://${username}:${password}@${host}:27017/?authSource=admin`;

    return new MongoClient(uri);
}
