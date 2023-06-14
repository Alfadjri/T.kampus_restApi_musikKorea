const GrupController = require('./grupController');
const Kota = require('../model/kota');
const Negara = require('../model/negara');
const Artis = require('../model/artis');
const member = require('../model/member');

const createArtis = async (req,res) => {
  let value = (req.body !== undefined) ? req.body : req;
  let id_grup = [];
  const id_negara = await checkNegara(value['negara'],value['kota']);
  value['negara'] = id_negara;
  const id_artis = await create(value); 
  const grup = value['grup'];
  grup.forEach((valueGrup) => {
      const searchGrup = GrupController.getGrup(valueGrup);
      console.log(searchGrup);
  });
  console.log("Sudah beres");
}

const create = async(value) => {
  let [id_artis] = await Artis.getValue(value['f_name']);
  if(id_artis.length === 0){
    await Artis.create(value);
    [id_artis] = await Artis.getValue(value['f_name']);
  }
  id_artis = id_artis[0]['id_artis'];
  return id_artis;
}

const checkNegara = async(name,Kota) => {
  let id_kota = (Kota === undefined) ? null : Kota;
  if(id_kota != null){
      id_kota = await checkKota(id_kota);
  }
  let [id_negara] = await Negara.getValue(name,id_kota);
  if(id_negara == 0){
    await Negara.create(name,id_kota);
    [id_negara] = await Negara.getValue(name,id_kota);
  }
  id_negara = id_negara[0]['id'];
  return id_negara;
}

 const checkKota = async (value) => {
  let [id_kota] = await Kota.getValue(value);
  if(id_kota.length === 0){
      await Kota.create(value);
      [id_kota] = await Kota.getValue(value);
  }
  id_kota = id_kota[0]['id_kota'];
  return id_kota;
}

module.exports = {
  createArtis,
}
