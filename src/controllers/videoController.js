const Video = require('../model/video');
const Grup = require('../model/grup');
const Artis = require('../model/artis');
const Relase = require('../model/relase');



const createVideo = async (req,res) => {
  try {
    const value = (req.body !== undefined) ? req.body : req ;
    const isType = value['type'];
    let isCreate;
    switch(isType) {
      case "Grup":
          const [id_grup] = await Grup.getGrupSong(value['artis']);
          if(id_grup[0] === undefined){
            if(req.body !== undefined){
              return res.status(400).json({Message : "Grup Belum Terdaftar !"});
            }else{
              return false; 
            }
          }
          value['artis'] =  id_grup[0]['id_grup'];
          value['relase'] = await getRelase(value['relase']);
      break;
      case "Solo":
          const [id_artis] = await Artis.getValue(value['artis']);
          if(id_artis[0] === undefined){
            if(req.body !== undefined){
              return res.status(400).json({Message : "Artis Belum Terdaftar !"});
            }else{
              return false;
            }
          }      
          value['artis'] = id_artis[0]['id_artis'];
          value['relase'] = await getRelase(value['relase']);
      break;
      default:
        if(req.body !== undefined) return res.status(400).json({ Message : "Type artis tidak di ketahui" });
        return false;
    }
    const [isValid] = await Video.getValue(value['song'] ,value['k_name']);
    if(isValid[0] !== undefined){
        if(req.body !== undefined) return res.status(200).json({Message: "Data berhasil di input"});
        return true;
    }
    await Video.create(value);
    if(req.body !== undefined) return res.status(200).json({Message:"Data berhasil di input"});
    return true;
  }catch(e) {
    if(req.body !== undefined) return res.status(400).json({Message:"Data yang ada masukan tidak sesuai"});
    return false;
  } 
}


const getRelase = async(value) => {
  const [isValid] = await Relase.getValue(value);
  if(isValid[0] !== undefined) return isValid[0]['id_relase'];
  await Relase.create(value);
  const [id_relase] = await Relase.getValue(value);
  return id_relase[0]['id_relase']; 
}

module.exports = {
 createVideo, 
}
