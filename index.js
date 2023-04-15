const qdrant = require ('./qdrant');




async function run () {
    const response = await qdrant.createCollection('test1', 4);

    console.log(response.data);
}

run();

