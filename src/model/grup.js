const db = require('../config/database/database');
const currentDate = new Date();
const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

const createGrup = (value) => {
  const shortValue = value.short ? `'${value.short}'` : null;
  const fans = value['fanclub name'] ? `'${value['fanclub name']}'` : null;
  const aktif = value['active'] == "Hiatus"  ? "No" : value['active'] == "No" ? "No" : "Yes";
  const query = `INSERT INTO Grup
                  (name, short, k_name, 
                    debut, id_company, 
                    member, o_member, 
                    funclub_name, Active, 
                    create_at, updated_at
                  ) 
                  VALUES 
                  ("${value.nama}", ${shortValue}, 
                  "${value['korea name']}", '${value.debut}', 
                  ${value['nama company']}, ${value['jumlah member']}, 
                  ${value['original member']},${fans},"${aktif}", 
                  '${formattedDate}', '${formattedDate}')`;
  return db.execute(query);
}

const getGrup = (value) => {
  const query = `SELECT Grup.*, Company.nama AS nama_company
               FROM Grup
               JOIN Company ON Grup.id_company = Company.id_company
               WHERE Grup.name = "${value}" limit 1`;
  return db.execute(query);
}

const getAllGrup = () => {
  const query = `SELECT Grup.*, Company.nama AS nama_company
               FROM Grup
               JOIN Company ON Grup.id_company = Company.id_company`;
  return db.execute(query);
}

const getGrupSong = (value) => {
  const query = `SELECT id_grup FROM Grup where name ="${value}" or short="${value}"`;
  return db.execute(query);
}

const updateGrup = (id_grup,value) => {
  const shortValue = value.short ? `'${value.short}'` : 'NULL';
  const fans = value['fanclub name'] ? `'${value['fanclub name']}'` : 'NULL';
  const aktif = (value['active'] == "Hiatus") ? "No" : (value['active'] == "No") ? "No" : "Yes";
  const query = `UPDATE Grup SET
                  name = "${value.nama}",
                  short = ${shortValue},
                  k_name = "${value['korea name']}",
                  debut = '${value.debut}',
                  id_company = ${value['nama company']},
                  member = ${value['jumlah member']},
                  o_member = ${value['original member']},
                  funclub_name = ${fans},
                  Active = "${aktif}",
                  updated_at = '${formattedDate}'
                WHERE id_grup = ${id_grup}`;
  return db.execute(query);
}
const deleteGrup = (idGrup) => {
  const query = `DELETE FROM Grup WHERE id_grup = ${idGrup}`;
  return db.execute(query);
}


module.exports = {
  createGrup,
  getGrup,
  getAllGrup,
  updateGrup,
  deleteGrup,
  getGrupSong,
}
