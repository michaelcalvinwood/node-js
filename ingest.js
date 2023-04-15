const splitter = require('./split-words');
const pdfUtil = require('pdf-to-text');
const mysql = require('./mysql');
const { v4: uuidv4 } = require('uuid');

const getPdfInfo = (fileName) => {
    console.log('fileName', fileName)
    return new Promise ((resolve, reject) => {
        pdfUtil.info(fileName, function(err, info) {
            if (err) reject(err);
            else resolve(info);
            return;
        });
    })
}

const extractFullPdfText = fileName => {
    return new Promise((resolve, reject) => {
        pdfUtil.pdfToText(fileName, function(err, data) {
            if (err) reject(err);
            else resolve(data); 
            return;    
          });
    })
}

/*
 * Ingests various data types to chunks table
 */

exports.pdf = async (fileName, botId) => {
    // get pdf info

    let result;
    
    const pdfInfo = await getPdfInfo(fileName);
    let pdfInfoStr = JSON.stringify(pdfInfo);
    if (pdfInfoStr.length > 2800) pdfInfoStr = JSON.stringify("");

    /*
     * TODO: Check file size and add to quota or abort if it will go over quota
     */


    const dataSourceId = uuidv4();


    result = await mysql.query(`INSERT INTO data_source (id, type, info) VALUES ('${dataSourceId}','pdf', '${pdfInfoStr}')`);

    console.log(result);

    

    // extract pdf to text

    // split into chunks 600/200

    // get chunk connection info and vector connectio info

    // foreach chunk
        // insert chunk into chunks table

        // get embedding
            // if failure, delete chunk from chunks table

        // add embedding to vector database
            // if failure, delete chunk from chunks table




    // /botId/css & js scripts. JS script contains JWT token with vector connection info and openAI Key
        //app.instantchatbot.net handles chatbot requests. For now, can be same IP address as home.instantchatbot.net


}