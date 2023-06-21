const db = require('../config/database/database');

const currentDate = new Date();
const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

const create = (value) => {
  const query = `INSERT INTO Artis(
                  s_name,f_name,
                  k_name,k_s_name, 
                  birth, gender,
                  id_negara,create_at, 
                  updated_at) 
                VALUES (
                  "${value['s_name']}",'${value['f_name']}',
                  '${value['k_name']}','${value['k_s_name']}',
                  '${value['birth']}','${value['gender']}',
                  ${value['negara']},'${formattedDate}','${formattedDate}')`; 
  return db.execute(query); 
}

const update = (value,id_artis) => {
  const query = `Update Artis
                  Set s_name = '${value['s_name']}',
                      f_name = '${value['f_name']}',
                      k_name = '${value['k_name']}',
                      k_s_name = '${value['k_s_name']}',
                      birth = '${value['birth']}',
                      gender = '${value['gender']}',
                      id_negara = '${value['negara']}',
                      updated_at = '${formattedDate}'
                where id_artis = '${id_artis}'`;
  return db.execute(query);
}

const deleteMember = (value) => {
  const query = `Delete from Artis where id_artis = '${value}'`;
  return db.execute(query);
}

const getValue = (values) => {
  const value = db.escape(values);
  const query = `Select * FROM Artis where f_name = "${value}" limit 1`;
  return db.execute(query);
}

const getAll = () => {
  const query = `Select * FROM Artis`;
  return db.execute(query);
}

module.exports = {
  create,
  getValue,
  getAll,
  update,
  deleteMember,
}

