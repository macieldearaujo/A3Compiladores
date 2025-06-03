import {mongoConnector} from './connector.js';

function getClient(){
    return mongoConnector();
};

export async function insert_on_database(data) {
    const client = getClient();
    try {
        await client.connect();

        const database = client.db(process.env.MONGO_DATABASE);
        const collection = database.collection(process.env.MONGO_COLLECTION);

        return await collection.insertOne(data);

    } catch (error) {
        console.error('Erro ao inserir:', error);
    } finally {
        await client.close();
    }
};

export async function find_one_on_database(query) {
    console.info("tentando no db")
    const client = getClient();
    try {
        await client.connect();

        const database = client.db(process.env.MONGO_DATABASE);
        const collection = database.collection(process.env.MONGO_COLLECTION);

        return await collection.findOne(query);

    } catch (error){
        console.error('Erro ao inserir:', error);
    } finally {
        await client.close();
    }
};

export async function delete_one_on_database(data) {
    const client = getClient();
    try {
        await client.connect();

        const database = client.db(process.env.MONGO_DATABASE);
        const collection = database.collection(process.env.MONGO_COLLECTION);

        return await collection.deleteOne(data);
    } catch (error){
        console.error('Erro ao inserir:', error);
    } finally {
        await client.close();
    }
}

export async function update_one_on_database(filter, data) {
    const client = getClient();
    try {
        await client.connect();

        const database = client.db(process.env.MONGO_DATABASE);
        const collection = database.collection(process.env.MONGO_COLLECTION);
    
        return await collection.updateOne(filter, data);
    } catch (error){
        console.error('Erro ao inserir:', error);
    } finally {
        await client.close();
    }
}


/*
module.exports = {
    insert_on_database,
    find_one_on_database,
    delete_one_on_database,
    update_one_on_database
}*/