import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config({ path: '../../../.env' });

export async function mongoConnector() {
    const host = "localhost"//process.env.MONGO_HOST;
    const username = "root"//process.env.MONGO_USERNAME;
    const password = "123"//process.env.MONGO_PASSWORD;
    const uri = `mongodb://root:123@localhost:27017/?authSource=admin`;

    return new MongoClient(uri);
}
