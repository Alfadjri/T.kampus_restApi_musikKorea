const db = require('../config/database/database');

const currentDate = new Date();
const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

const create = (value) => {
  const query = `INSERT INTO Artis (s_name,f_name,k_name,k_s_name, birth, gender,id_negara,create_at, updated_at) VALUES 
                ('${value['s_name']}','${value['f_name']}','${value['k_name']}','${value['k_s_name']}','${value['birth']}','${value['gender']}',${value['negara']},'${formattedDate}','${formattedDate}')`; 
  return db.execute(query); 
}

const getValue = (value) => {
  const query = `Select * FROM Artis`;
  return db.execute(query);
}

module.exports = {
  create,
  getValue,
}

