const mysql = require('./mysql');

exports.setBotConnectionInfo = async (botId, chunkInfo, vectorInfo, appInfo) => {
    const chunk = mysql.escape(JSON.stringify(chunkInfo));
    const vector = mysql.escape(JSON.stringify(vectorInfo));
    const app = mysql.escape(JSON.stringify(appInfo));

    return await mysql.query(`INSERT INTO connection_info (bot_id, chunk, vector, app) VALUES ('${botId}', ${chunk}, ${vector}, ${app})`);
}