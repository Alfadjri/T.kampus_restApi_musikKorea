// impoert config
const db = require('../config/database/database');

const getUsers = () => {
   const query = "SELECT * FROM Users";
    console.log(query);
    return db.execute(query);
}

module.exports = {
  getUsers,
}
