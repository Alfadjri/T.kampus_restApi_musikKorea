const mysql = require('mysql2');
const port = process.env.db_port;
const host = process.env.db_host;
const user = process.env.db_user;
const password = porcess.env.db_password;
const database = process.env.db_database;

const db = mysql.createPool({
  host : host,
  port : port,
  user : user,
  password : password,
  database : database,
});

module.export - db.promise();

