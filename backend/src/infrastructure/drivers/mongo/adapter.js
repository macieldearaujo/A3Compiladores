import { databaseName } from '../../constants/mongoConstants.js';
import {mongoConnector} from './connector.js';

async function getClient(){
    return await mongoConnector();
};

export async function insertOnDatabase(data, collectionName) {
    const client = await getClient();
    try {
        await client.connect();

        const database = client.db(databaseName);
        const collection = database.collection(collectionName);
        const result = await collection.insertOne(data);
        return result;

    } catch (error) {
        console.error('Erro ao inserir:', error);
        throw error;
    } finally {
        await client.close();
    }
};

export async function findOneOnDatabase(query, projection, collectionName) {
    const client = await getClient();
    try {
        await client.connect();

        const database = client.db(databaseName);
        const collection = database.collection(collectionName);
        const result = await collection.findOne(query, projection);
        return result;

    } catch (error) {
        console.error('Erro ao realizar busca:', error);
        throw error;
    } finally {
        await client.close();
    }
};

export async function deleteOneOnDatabase(data, collectionName) {
    const client = await getClient();
    try {
        await client.connect();

        const database = client.db(databaseName);
        const collection = database.collection(collectionName);

        return await collection.deleteOne(data);
    } catch (error){
        console.error('Erro ao excluir:', error);
        throw error;
    } finally {
        await client.close();
    }
}

export async function updateOneOnDatabase(filter, data, collectionName) {
    const client = await getClient();
    try {
        await client.connect();

        const database = client.db(databaseName);
        const collection = database.collection(collectionName);

        return await collection.updateOne(filter, data);
    } catch (error){
        console.error('Erro ao atualizar:', error);
        throw error;
    } finally {
        await client.close();
    }
}

const client = await getClient();
export async function findManyOnDatabase(query, projection, collectionName) {
    try {
        await client.connect();

        const database = client.db(databaseName);
        const collection = database.collection(collectionName);
        const result = await collection.find(query, projection).toArray();
        return result;

    } catch (error) {
        console.error('Erro ao realizar busca:', error);
        throw error;
    } finally {
        await client.close();
    }
};