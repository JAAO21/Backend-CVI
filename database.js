const myConnection = require('express-myconnection');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();
const initDb = async (app) => {
    try {
        app.use(myConnection(mysql, {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: process.env.PORT_DB,
            database: process.env.DB_NAME,

        }, 'single'))
        console.log('db on')
    } catch (error) { console.log(error) }
}
/* const initDb = async (app) => {
    try {
        app.use(myConnection(mysql, {
            host: process.env.DBDOMYSQL_HOST,
            user: process.env.DBDOMYSQL_USER,
            password: process.env.DBDOMYSQL_PASSWORD,
            port: process.env.DBDOMYSQL_PORT,
            database: process.env.DBDOMYSQL_NAME,   
            ssl: {
                rejectUnauthorized:false
            }         
        }, 'single'))
        console.log('db on')
    } catch (error) { console.log(error) }
} 
 */
module.exports = initDb;
