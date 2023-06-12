const Grup = require('../model/grup');
const Cor = require('../model/company');


const createGrup = async (req,res) => {
    let value = (req.body !== undefined) ? req.body : req;
    let [id_cor] = await Cor.getValue(value['nama company']);
    if (id_cor.length === 0 ) {
      Cor.create(value['nama company']);
      [id_cor] = await Cor.getValue(value['nama company']);
    }
    if(id_cor[0] === undefined){
      return false;
    }
    id_cor = id_cor[0]['id_company'];
    value['nama company'] = id_cor;
    let [id_grup] = await Grup.getGrup(value['nama']);
    if(id_grup.length === 0) {
      Grup.createGrup(value);
    };
    if(req.body !== undefined){
      return res.status(200).json({ Masage: "Grup Telah berhasil di buat"});
    }else{
      return true;
    }
}

const getAllGrup = async (req,res) => {
   const [result] = await Grup.getAllGrup();
    res.status(200).json({
      message : "Data berhasil di ambil",
      data : result
  });
}
const searchGrup  = async(req,res) => {
  const search = req.params.nama;
  const [result] = await Grup.getGrup(search);
  res.status(200).json({
    message : "Data berhasil di ambil",
      data : result
  });
}


const updateGrup = async(req,res) => {
  const search = req.params.nama;
  const body = req.body;
  const [before] = await Grup.getGrup(search);
  const id_grup = before[0]['id_grup'];
  let [id_cor] = await Cor.getValue(body['nama company']);
    if (id_cor.length === 0 ) {
      Cor.create(body['nama company']);
      [id_cor] = await Cor.getValue(body['nama company']);
    }
    if(id_cor[0] === undefined){
      return false;
    }
    id_cor = id_cor[0]['id_company'];
    body['nama company'] = id_cor;
  await Grup.updateGrup(id_grup,body);
  const [after] = await Grup.getGrup(search);
  res.status(200).json({
    message : "Data berhasil di update",
    data : after
  });
}
const deleteGrup = async(req,res) => {
  const search = req.params.nama;
  const [getid] = await Grup.getGrup(search);
  if(getid.length === 0 ){
    res.status(404).json({ massage : "Data tidak ditekmukan"});
  }
  await Grup.deleteGrup(getid[0]['id_grup']);
  res.status(200).json({ massage : "Data berhasil di hapus"});

}

module.exports = {
  createGrup,
  getAllGrup,
  searchGrup,
  updateGrup,
  deleteGrup
}
