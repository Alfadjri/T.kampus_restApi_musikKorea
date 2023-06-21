const mysql = require('mysql2');
const host = process.env.db_host;
const user = process.env.db_user;
const port = process.env.db_port;
const password = process.env.db_password;
const database = process.env.db_database;

const db = mysql.createPool({
  host : host,
  user : user,
  port : port,
  password : password,
  database : database,
});

module.exports = db.promise();

