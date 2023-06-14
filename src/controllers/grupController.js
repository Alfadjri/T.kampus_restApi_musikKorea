const Grup = require('../model/grup');
const Cor = require('../model/company');


const createGrup = async (req,res) => {
    let value = (req.body !== undefined) ? req.body : req;
  try{
    value['nama company'] = await getCore(value['nama company']);
    let [id_grup] = await Grup.getGrup(value['nama']);
    if(id_grup.length === 0) {
      await Grup.createGrup(value);
    };
    if(req.body !== undefined){
      return res.status(200).json({ Message: "Grup Telah berhasil di buat"});
    }else{
      return true;  
    }
  }catch(e){
    if(req.body !== undefined){
      return res.status(400).json({ Message: "Data yang anda masukan tidak sesuai"});
    }else{
      return false;
    }
  }
}

const getCore = async (value) => {
    let [ischeck] = await Cor.getValue(value);
    if(ischeck[0] !== undefined ){
      return ischeck[0]['id_company'];
    }else{
      await Cor.create(value);
      const [id_cor] = await Cor.getValue(value);
      return id_cor[0]['id_company'];
    }
}

const getGrup  = async(req,res) => {
  try{
    const search = req.params;
    let result = [];
    if(search){
      [result] = await Grup.getGrup(search.nama);
    }else{
      [result] = await Grup.getAllGrup();
    }
    return res.status(200).json({
      message : "Data berhasil di ambil",
      data : result
    });
  }catch(e){
    return res.status(404).json({ Message : "Data tidak di temukan"});
  }
}


const updateGrup = async(req,res) => {
  try{
    const search = req.params.nama;
    const body = req.body;
    const [before] = await Grup.getGrup(search);
    const id_grup = before[0]['id_grup']; 
    const id_cor = await getCore(body['nama company']);
    body['nama company'] = id_cor;
    await Grup.updateGrup(id_grup,body);
    const [after] = await Grup.getGrup(body['nama']);
    return res.status(200).json({
      message : "Data berhasil di update",
      data : after
    });
  }catch(e){
    return res.status(404).json({ Message : "Data tidak di temukan"});
  }
}
const deleteGrup = async(req,res) => {
  try{
    const search = req.params.nama;
    const [getid] = await Grup.getGrup(search);
    if(getid.length === 0 ){
      return res.status(404).json({ massage : "Data tidak ditemukan"});
    }
    await Grup.deleteGrup(getid[0]['id_grup']);
    return res.status(200).json({ massage : "Data berhasil di hapus"});
  }catch(e){
    return res.status(404).json({ Message : "Data tidak ditemukan"});
  }
}

module.exports = {
  createGrup,
  getGrup,
  updateGrup,
  deleteGrup
}
