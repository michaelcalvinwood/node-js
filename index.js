const qdrant = require ('./qdrant');
const { v4: uuidv4 } = require('uuid');

async function run () {
    let response;

    response = await qdrant.createCollection('test2', 4);
    //const response = await qdrant.collectionInfo('test1');
    // const response = await qdrant.addPoint('test1', {
    //     id: uuidv4(),
    //     vector: [0.05, 0.61, 0.76, 0.74], 
    //     payload: {"city": "Berlin" }
    // });

    // response = await qdrant.deleteCollection('test1');

    // console.log(response.data);

    // response = await qdrant.collectionInfo('test1');

    console.log(response);
}

run();

