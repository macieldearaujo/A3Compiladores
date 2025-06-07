import {mongoConnector} from './connector.js';

async function getClient(){
    return await mongoConnector();
};

export async function insert_on_database(data) {
    const client = await getClient();
    try {
        await client.connect();

        const database = client.db("corpFlow");
        const collection = database.collection("users");
        result = await collection.insertOne(data);
        return result;

    } catch (error) {
        console.error('Erro ao inserir:', error);
        throw error;
    } finally {
        await client.close();
    }
};

export async function find_one_on_database(query, projection) {
    const client = await getClient();
    try {
        await client.connect();

        const database = client.db("corpFlow");
        const collection = database.collection("users");
        const result = await collection.findOne(query, projection);
        return result;

    } catch (error) {
        console.error('Erro ao realizar busca:', error);
        throw error;
    } finally {
        await client.close();
    }
};

export async function delete_one_on_database(data) {
    const client = await getClient();
    try {
        await client.connect();

        const database = client.db("corpFlow");
        const collection = database.collection("users");

        return await collection.deleteOne(data);
    } catch (error){
        console.error('Erro ao excluir:', error);
        throw error;
    } finally {
        await client.close();
    }
}

export async function update_one_on_database(filter, data) {
    const client = await getClient();
    try {
        await client.connect();

        const database = client.db("corpFlow");
        const collection = database.collection("users");
    
        return await collection.updateOne(filter, data);
    } catch (error){
        console.error('Erro ao atualizar:', error);
        throw error;
    } finally {
        await client.close();
    }
}
