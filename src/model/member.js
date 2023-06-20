const db = require('../config/database/database');
const currentDate = new Date();
const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');



const create = (id_artis,id_grup) => {
  const query = `INSERT INTO Member_grup(id_artis, id_grup, create_at, updated_at) VALUES 
                  (${id_artis},${id_grup},'${formattedDate}','${formattedDate}')`;
  return db.execute(query);
}

const getMember = (id_artis,id_grup) => {
  let query;
  const isGrup = (id_grup !== undefined) ? true : false;

  if(isGrup == true){
    query = `Select * from Member_grup where id_artis = '${id_artis}' and id_grup = '${id_grup}'`;
  }else{
    query = `SELECT id_member as member FROM Member_grup where id_artis = '${id_artis}'` ;
  }
  return db.execute(query);
}

const deleteMember = (id_member) => {
  const query = `Delete from Member_grup where id_member = '${id_member}'`;
  return db.execute(query);

}

const update = (id_artis,id_grup,id_member) => {
  const query = `UPDATE Member_grup 
                  SET id_artis   ='${id_artis}',
                      id_grup    ='${id_grup}',
                      updated_at ='${formattedDate}'
                 WHERE id_member = '${id_member}'`;
  return db.execute(query);
}

module.exports = {
  create,
  getMember,
  update,
  deleteMember
}
