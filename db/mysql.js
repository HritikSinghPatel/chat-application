const mysql = require('mysql');
const config = require('../config/sqlConfig');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "chat_appliction"
});

module.exports = pool;
