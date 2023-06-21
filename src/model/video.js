const db = require('../config/database/database');

const currentDate = new Date();
const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');



const create = (value) => {
  const is_grup = (value['type'] == "Grup") ? value['artis'] : 'NULL';
  const is_artis = (value['type'] == "Solo") ? value['artis'] : 'NULL';
  const director = (value['director'] == null) ? null : `${value['director']}`;
  const song = db.escape(value['song']);
  const query = `INSERT INTO Video(
                  id_artis, id_grup, 
                  type, S_name, 
                  k_name,director, 
                  id_relase, date,
                  video, create_at, 
                  update_at) 
              VALUES (
                  ${is_artis},${is_grup},
                  '${value['type']}',${song},
                  '${value['k_name']}',"${director}",
                  '${value['relase']}','${value['date']}',
                  '${value['link']}','${formattedDate}',
                  '${formattedDate}')`;
  return db.execute(query);
} 

const getValue = (songs,k_name) => {
  const is_k = (k_name !== undefined) ? db.escape(`${k_name}`) : null ;
  const song = db.escape(`${songs}`);
  let query;
  if(is_k === null){
    query = `Select * FROM Video where S_name = ${song} and k_name is null`; 
  }else{
    query = `Select * FROM Video where S_name = ${song} and k_name = ${is_k}`;
  }
  return db.execute(query);  
} 

module.exports = {
  create,
  getValue,
}
