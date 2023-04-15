require ('dotenv').config();
const axios = require('axios');
const { Configuration, OpenAIApi } = require("openai");
const { v4: uuidv4 } = require('uuid');

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

exports.createCollection = async (host, port, collectionName, size, onDiskPayload = true, distance = 'Cosine') => {
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
                distance
            }
        }
    }
        
    return promisfiedAxios(request);   
}

exports.collectionInfo = async (host, port, collectionName) => {
    const request = {
        url: `${host}:${port}/collections/${collectionName}`,
        method: 'get'
    }

    return promisfiedAxios(request);
}

exports.deleteCollection = async (host, port, collectionName) => {
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

exports.addPoint = async (host, port, collectionName, point) => {
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

const getEmbedding = async (openAiKey, input) => {
    const configuration = new Configuration({
        apiKey: openAiKey,
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

exports.createOpenAICollection = async (host, port, collectionName) => {
    return this.createCollection(host, port, collectionName, 1536);
}

exports.addOpenAIPoint = async (host, port, openAiKey, collectionName, pointId, input) => {
    let result = await getEmbedding(openAiKey, input);

    if (!result.isSuccess) return result;

    const vector = result.msg;

    return await this.addPoint(host, port, collectionName, {id: pointId, vector});
}