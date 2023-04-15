require ('dotenv').config();
const axios = require('axios');


const host = process.env.QDRANT_HOST;
const port = process.env.QDRANT_PORT;

/*
 * collections
 */

const promisfiedAxios = request => {
    return new Promise (async(resolve, reject) => {
        let response;
    
        try {
            response = await axios(request);
            return resolve({isSuccess: true, msg: response.data});
        } catch (err) {
            return resolve ({isSuccess: false, msg: err.response && err.response.data ? err.response.data : err})
        }
    });
}

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
        
    return promisfiedAxios(request);   
}

exports.collectionInfo = async (collectionName) => {
    const request = {
        url: `${host}:${port}/collections/${collectionName}`,
        method: 'get'
    }

    return promisfiedAxios(request);
}

exports.deleteCollection = async (collectionName) => {
    const request = {
        url: `${host}:${port}/collections/${collectionName}`,
        method: 'DELETE'
    }

    return promisfiedAxios(request);
}

/*
 * point: { id, vector, payload}
 */

exports.addPoint = async (collectionName, point) => {
    const { id, vector, payload } = point;
    
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

    return promisfiedAxios(request);
}

exports.createOpenAICollection = async collectionName => {
    return this.createCollection(collectionName, 1536);
}

exports.addOpenAIPoint = async (collectionName, data) => {
    // turn data into vector
}