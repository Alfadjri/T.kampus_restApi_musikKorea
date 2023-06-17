const Kota = require('../model/kota');
const Negara = require('../model/negara');
const Artis = require('../model/artis');
const Grup = require('../model/grup');
const Member = require('../model/member');

const createArtis = async (req,res) => {
  let value = (req.body !== undefined) ? req.body : req;
  try {
  const id_negara = await checkNegara(value['negara'],value['kota']);
  value['negara'] = id_negara;
  const id_artis = await create(value); 
  const grup = value['grup'];
  if(grup[0] !== undefined){
    for(const valueGrup of grup){
        const searchGrup = await getGrup(valueGrup);
        if(searchGrup == false){
          if (req.body !== undefined){
            return res.status(400).json({ Message : "Grup Belum Terdaftar"});
          }else{
            return false; 
          }
        }
        await Member.create(id_artis,searchGrup);
    };
  }
  if(req.body !== undefined){
      return res.status(200).json({ Message : "Data berhasil Di Buat"});
  }else{
      return true;
  }
  } catch(e) {
    if(req.body !== undefined){
      return res.status(400).jsn({ Message : "Data yang anda masukan tidak sesuai"});
    }else{
      return false;
    }
  }
}

const getUpdate = async(req,res) => {
    try{
        const search = req.params.nama;
        const body = req.body;
        const [before] = await Artis.getValue(search);
        console.log(before);
        const id_artis = before[0]['id_artis'];
        const id_negara = await checkNegara(body.negara,body.kota);
        body.negara = id_negara;
        const grup =req.body.grup;
        // kalau grup ada  
        if(grup[0] !== undefined){
          for(const valueGrup of grup) {
            const id_grup = await getGrup(valueGrup);
            if(id_grup == false){
              return res.status(400).json({Message : "Grup yang di sebutkan tidak terdaftar"});
            }
            const [isMember] = await Member.getMember(id_artis);
            if(isMember[0]['member'] <= 0 ){
              await Member.create(id_artis,id_grup);
            }else{
              const [getMember] = await Member.getMember(id_artis,id_grup);
              const id_member = getMember[0]['id_member'];
              await Member.update(id_artis,id_grup,id_member);
            }
          }
        }
        await Artis.update(body,id_artis);
        const [after] = await Artis.getValue(body.f_name); 
        return res.status(200).json({
          Message : "Data Berhasil di update",
          data : after
        });
    }catch(e){
        return res.status(400).json({Message : "Parameter tidak di temukan"});
    }
}

const getValue = async (req,res) => {
  try{
    const search = req.params;
    let result = [];
    if(search.nama != null){
        [result] = await Artis.getValue(search.nama);
    }else{
        [result] = await Artis.getAll();
    }
    return res.status(200).json({ Message : "Data berhasil di ambil" , data : result });
  }catch(e){
    return res.status(400).json({ Message : "Data tidak di temukan" });
  }
}

const create = async(value) => {
  const [isValid] = await Artis.getValue(value['f_name']);
  if(isValid[0] !== undefined){
    return isValid[0]['id_artis']; 
  }
  await Artis.create(value);
  const [id_artis] = await Artis.getValue(value['f_name']);
  return id_artis[0]['id_artis'];
}

const checkNegara = async(name,Kota) => {
  let id_kota = (Kota === undefined) ? null : Kota;
  if(id_kota != null){
      id_kota = await checkKota(id_kota);
  }
  const [isValid] = await Negara.getValue(name,id_kota);
  if(isValid[0] !== undefined){
    return isValid[0]['id'];
  }
  await Negara.create(name,id_kota);
  const [id_negara] = await Negara.getValue(name,id_kota);
  return id_negara[0]['id'];
}

 const checkKota = async (value) => {
  const [isValid] = await Kota.getValue(value);
  if(isValid[0] !== undefined){
      return isValid[0]['id_kota'];
  }
  await Kota.create(value);
  const [id_kota] = await Kota.getValue(value);
  return id_kota[0]['id_kota'];
}

const getGrup = async (value) => {
  const [isValid] = await Grup.getGrup(value);
  if(isValid[0] !== undefined){
      return isValid[0]['id_grup'];
  }
  return false;
}

module.exports = {
  createArtis,
  getValue,
  getUpdate,
}
