const dotenv = require('dotenv');
const config = dotenv.config();

module.exports = {
    serverConfig: {
        port: process.env.PORT,
        hostURL: process.env.HOST_URL,
    },
    dbConfig: {
        host : process.env.SQL_SERVER,
        user : process.env.SQL_USER,
        password : process.env.SQL_PASSWORD,
        database : process.env.SQL_DATABASE,
    },
}
