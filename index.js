const qdrant = require ('./qdrant');




async function run () {
    //const response = await qdrant.createCollection('test1', 4);
    const response = await qdrant.confirmCollection('test1');
    
    console.log(response.data);
}

run();

