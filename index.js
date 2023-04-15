const qdrant = require ('./qdrant');

async function run () {
    //const response = await qdrant.createCollection('test1', 4);
    //const response = await qdrant.confirmCollection('test1');
    const response = await qdrant.addPoint('test1', {
        vector: [0.05, 0.61, 0.76, 0.74], payload: {"city": "Berlin" }
    });
    
    console.log(response.data);
}

run();

