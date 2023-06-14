const currentDate = new Date();
const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');



const create = (value) => {
  const query = `INSERT INTO Member_grup(id_artis, id_grup, create_at, updated_at) VALUES 
                  (${value.id_artis},${value.id_grup},${formattedDate},${formattedDate})`;
}
