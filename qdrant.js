require ('dotenv').config();
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

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

exports.confirmCollection = async (collectionName) => {
    const request = {
        url: `${host}:${port}/collections/${collectionName}`,
        method: 'get'
    }

    return axios(request);
}

/*
 * point: { vector, payload}
 */

exports.addPoint = async (collectionName, point) => {
    const { vector, payload } = point;
    const id = uuidv4();

    const request = {
        url: `${host}:${port}/collections/${collectionName}/points`,
        method: 'put',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        },
        data: {
            points: [
                {
                    id, vector, payload

                }
            ]
        }
    }

    return axios(request);
}