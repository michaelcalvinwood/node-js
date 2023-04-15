const qdrant = require ('./qdrant');
const { v4: uuidv4 } = require('uuid');
const mysql = require('./mysql');


async function run () {
    let response;

    response = await mysql.query('SHOW TABLES');

    console.log(response);

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

