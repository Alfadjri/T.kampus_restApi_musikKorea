const db = require('../config/database/database');
const currentDate = new Date();
const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

const getValue = (search) => {
  const query = `SELECT id_kota , place  FROM Kota WHERE place = "${search}" LIMIT 1 `;
  return db.execute(query);
}
const create = (city) => {
  const query = `INSERT INTO Kota(place,create_at,updated_at) VALUES ('${city}','${formattedDate}','${formattedDate}')`;
  return db.execute(query);
}
module.exports = {
  getValue,
  create,
}
