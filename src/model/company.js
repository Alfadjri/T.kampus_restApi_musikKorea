const db = require('../config/database/database');
const currentDate = new Date();
const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
const create = (value) => {
    const query = `INSERT INTO Company(nama, create_at, updated_at) 
                 VALUES 
                ('${value}', '${formattedDate}', '${formattedDate}')`;
    return db.execute(query)
}

const getValue = (search) => {
    const query = `SELECT id_company, nama FROM Company WHERE nama = "${search}" LIMIT 1 `;
    return db.execute(query);
};

module.exports = {
  create,
  getValue,
}
