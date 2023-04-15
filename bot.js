const mysql = require('./mysql');

exports.setBotConnectionInfo = async (botId, chunkInfo, vectorInfo) => {
    return await mysql.query(`INSERT INTO connection_info (bot_id, chunk, vector) VALUES ('${botId}', ${mysql.escape(JSON.stringify(chunkInfo))}, ${mysql.escape(JSON.stringify(vectorInfo))})`)
}