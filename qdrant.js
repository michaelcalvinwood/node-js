require ('dotenv').config();
const axios = require('axios');

const host = process.env.QDRANT_HOST;
const port = process.env.QDRANT_PORT;

exports.createCollection = async (collectionName, size) => {
    const request = {
        url: `${host}:${port}/collections/${collectionName}`,
        method: 'put',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        },
        data: {
            vectors: {
                size,
                distance: 'Dot'
            }
        }
    }
    
    return axios(request);
}