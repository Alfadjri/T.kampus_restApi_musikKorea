const db = require('../config/database/database');

const currentDate = new Date();
const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');



const create = (value) => {
  const query = `INSERT INTO relase (name, create_at, updated_at) 
                VALUES ('${value}','${formattedDate}','${formattedDate}')`;
  return db.execute(query);
}

const getValue = (value) => {
  const query = `Select * from relase where name = '${value}'`;
  return db.execute(query);
}


module.exports = {
  create,
  getValue,
}
