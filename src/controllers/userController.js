const User = require('../model/user');

const getAll = async (req,res) => {
  try {
    const [data] = await User.getUsers();
    res.status(200).json({
        pesan : "Data Berhasil di ambil",
        data : data
    });
  }catch (error) {
    res.status(404).json({
      pesan : "Data tidak ditemukan",
    });
  }
}

module.exports = {
  getAll,
}
