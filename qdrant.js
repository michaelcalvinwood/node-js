require ('dotenv').config();
const axios = require('axios');
const { Configuration, OpenAIApi } = require("openai");
const { v4: uuidv4 } = require('uuid');

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
 * Note: payload is optional
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

/*
 * openAI interface
 */

const getEmbedding = async (input) => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      let embeddingResponse;
      try {
        embeddingResponse = await openai.createEmbedding({
            model: 'text-embedding-ada-002',
            input,
          })    
      } catch (err) {
        console.error('Axios err', err.response.data);
        return {isSuccess: false, msg: err.response && err.response.data ? err.response.data : err};
      }
      
      const [{ embedding }] = embeddingResponse.data.data
      return {isSuccess: true, msg: embedding};
}

exports.createOpenAICollection = async collectionName => {
    return this.createCollection(collectionName, 1536);
}

exports.addOpenAIPoint = async (collectionName, id, input) => {
    let result = await getEmbedding(input);

    if (!result.isSuccess) return result;

    const vector = result.msg;

    return await this.addPoint(collectionName, {id, vector});
}