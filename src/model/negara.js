const db = require('../config/database/database');
const currentDate = new Date();
const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

const getValue = (search,id_kota) => {
  const isKota = (id_kota !== null) ? true : false;
  let query;
  if(isKota){
     query = `Select Negara.id_negara as id , Negara.name_negara as negara , Kota.place as kota 
              FROM Negara JOIN Kota ON Negara.id_kota = Kota.id_kota 
              WHERE Negara.name_negara = "${search}"  and Kota.id_kota = "${id_kota}" Limit 1`;
  }else{
    query = `Select id_negara as id , name_negara as negara FROM Negara WHERE name_negara = "${search}" Limit  1`; 
  }
  return db.execute(query);
}

const create = (negara,id_kota) => {
  const idKota = (id_kota !== null) ? id_kota : null;
  const query = `Insert Into Negara ( name_negara , id_kota , create_at , updated_at) VALUES
                ('${negara}',${idKota},'${formattedDate}','${formattedDate}')`;
  return db.execute(query);
}

module.exports = {
  getValue,
  create,
}
