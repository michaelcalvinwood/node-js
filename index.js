require('dotenv').config();
const qdrant = require ('./qdrant');
const { v4: uuidv4 } = require('uuid');
const mysql = require('./mysql');
const bot = require('./bot');
const ingest = require('./ingest');

async function run () {
    let response;

    response = ingest.pdf('test', process.cwd() + '/assets/pdf/PYMNTS-Online-Bank-Transfers-September-2022.pdf');

    // response = await bot.setBotConnectionInfo('test', 
    //     {
    //         type: 'mysql',
    //         host: 'chunk-1.instantchatbot.net',
    //         database: 'chunks',
    //         user: 'admin',
    //         password: process.env.MYSQL_PASSWORD
    //     }, 
    //     {
    //         type: 'qdrant',
    //         host: 'qdrant-1.instantchatbot.net',
    //         port: 6333,
    //         collection: 'test'
    //     },
    //     {
    //         type: 'node',
    //         host: 'app-1.instantchatbot.net',
    //         port: 5100
    //     }
    // );
    // console.log(response);

    //response = await mysql.query('SHOW TABLES');

    
    //response = await qdrant.createOpenAICollection('openai');
    
    //response = await qdrant.addOpenAIPoint('openai', uuidv4(), 'yippy dippy');

    //const response = await qdrant.collectionInfo('test1');
    // const response = await qdrant.addPoint('test1', {
    //     id: uuidv4(),
    //     vector: [0.05, 0.61, 0.76, 0.74], 
    //     payload: {"city": "Berlin" }
    // });

    // response = await qdrant.deleteCollection('test1');

    // console.log(response.data);

    // response = await qdrant.collectionInfo('test1');

    //console.log(response);
}

run();

