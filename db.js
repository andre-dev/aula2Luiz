//db.js

const ObjectId = require("mongodb").ObjectId;
const MongoClient = require("mongodb").MongoClient; 

async function connect(){
        const { MongoClient } = require("mongodb");
        const client = new MongoClient(process.env.MONGODB_CONNECTION);
        await client.connect();
        global.connection = client.db("aula02");
        console.log("Banco de dados conectado com sucesso!!");
    }

function buscarClientes(){
    return global.connection
    .collection("clientes")
    .find({})
    .toArray();
}

function buscarCliente(id){
    const objectId = new ObjectId(id);
    return global.connection
    .collection("clientes")
    .findOne({_id: objectId});
}

function inserirCliente(cliente){
    return global.connection
    .collection("clientes")
    .insertOne(cliente);
}

function atualizarCliente(id, cliente){
    const objectId = new ObjectId(id);
    return global.connection
    .collection("clientes")
    .updateOne({_id: objectId},{$set: cliente});
}

function excluirCliente(id){
    const objectId = new ObjectId(id);
    return global.connection
    .collection("clientes")
    .deleteOne({_id: objectId});
}

connect();

module.exports = {

    buscarClientes,
    buscarCliente,
    inserirCliente,
    atualizarCliente,
    excluirCliente

}
