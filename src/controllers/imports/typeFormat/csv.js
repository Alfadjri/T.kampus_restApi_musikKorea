const xlsx = require('xlsx');
const {format} = require('date-fns');

const Artis = require('../../artisController');
const Grup  = require('../../grupController');
const Video = require('../../videoController');


const importFile = async (file,type) => {
    const workBook = xlsx.read(file.buffer,{ type: 'buffer' });
    const workSheet = workBook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workBook.Sheets[workSheet]);
    let isValid = null;
    for(const datas of sheetData){
        let mainData = null;
        switch(type){
          case 'artis':
            mainData = formatArtis(datas); 
            isValid = await Artis.createArtis(mainData);
          break;
          case 'grup':
            mainData = formatGrup(datas);
            isValid = await Grup.createGrup(mainData);
          break;
          case 'video':
            mainData = formatVideo(datas);
            isValid = await Video.createVideo(mainData);
          break;
          default:
            return false;
      }
    };
    return isValid;
}

const changeFormatData = (value) => {
  const date = new Date((value - 25569) * 86400 * 1000); // Mengonversi angka Excel menjadi Unix timestamp
  const formattedDate = format(date, 'yyyy-MM-dd');
  return formattedDate;
}
const formatGrup = (datas) => {
    const data = Object.keys(datas).sort();
      let mainData = {};
      let Data = null;
      data.forEach((key) => {
        if(key == 'Name'){
          Data = {"nama" :`${datas[key]}`};  
        }
        if(key == "Korean Name"){
          Data = {"korea name" :`${datas[key]}`}; 
        }
        if(key == "Debut"){
          const date = changeFormatData(`${datas[key]}`);
          Data = {"debut" :`${date}`}; 
        }
        if(key == "Company"){
          Data = {"nama company" :`${datas[key]}`}; 
        }
        if(key == "Members"){
          Data = {"jumlah member" :`${datas[key]}`};  
        }
        if(key == "Orig. Memb."){
          Data = {"original member" :`${datas[key]}`}; 
        }
        if(key == "Active"){
          Data = {"active" :`${datas[key]}`};
        }
        if(key == "Fanclub Name"){
          const fan = (datas[key] !== null) ? `${datas[key]}` : null;
          Data = {"fanclub name" : `${fan}`}; 
        }
        if(key == "Short"){
          const short = (datas[key] !== null) ? `${datas[key]}` : null;
          Data = {"short" : `${short}`};
        }
        mainData = Object.assign(mainData,Data);
      }); 
      return mainData;
}

const formatArtis = (datas) => {
    const data = Object.keys(datas).sort();
    let mainData = {};
    let Data = null;
    let dataGrup = [];
    data.forEach((key) => {
      if(key == "Stage Name"){
        Data = {"s_name" : `${datas[key]}`};
      }
      if(key == "Full Name"){
        Data = {"f_name" : `${datas[key]}`};
      }
      if(key == "Korean Name"){
        Data = {"k_name" : `${datas[key]}`};
      }
      if(key == "K. Stage Name"){
        Data = {"k_s_name" : `${datas[key]}`};
      }
        mainData = Object.assign(mainData,Data);

      if(key == "Group"){
        if(datas[key] !== null) dataGrup.push(`${datas[key]}`);
      }
      if(key == "Other Group"){
        if(datas[key] !== null) dataGrup.push(`${datas[key]}`);
      }
      if(dataGrup !== undefined){
        Data = {"grup" : dataGrup};
      }
      if(key == "Date of Birth"){
        const date = changeFormatData(`${datas[key]}`);
        Data = {"birth" :`${date}`}; 
      }
      if(key == "Country"){
        Data = {"negara" : `${datas[key]}`};
      }
      if(key == "Gender"){
        Data = {"gender" : `${datas[key]}`};
      }
      mainData = Object.assign(mainData,Data);
      if(key == "Birthplace"){
        const kota = (datas[key] === null) ? null : `${datas[key]}`;
        Data = {"kota" : `${kota}`};
      }
      mainData = Object.assign(mainData,Data);
    });
    return mainData;
}


const formatVideo = (datas) => {
    const data = Object.keys(datas).sort();
    let mainData ={};
    let Data = null;
    data.forEach((key) => {
      if(key == "Date"){
        const date = changeFormatData(`${datas[key]}`);
        Data = { "date" : `${date}`};
      }
      if(key == "Artist"){
        Data = { "artis" : `${datas[key]}`};
      }
      if(key == "Song Name"){
        Data = { "song" : `${datas[key]}`};
      }
      if(key == "Korean Name"){
        const korea = (datas[key] === null) ? null : `${datas[key]}`;
        Data = { "k_name" : `${korea}`};
      }
      if(key == "Director"){
        const dr = (datas[key] === null) ? null : `${datas[key]}`;
        Data = { "director" : `${dr}`};
      }
      if(key == "Video"){
        Data = { "link" : `${datas[key]}`};
      }
      if(key == "Type"){
        const typeValue = (datas[key] == "Boy" || datas[key] == "Girl") ? "Grup" : "Solo";
        Data = { "type" : `${typeValue}`};
      }
      if(key == "Release"){
        Data = { "relase" : `${datas[key]}`};
      }
      mainData = Object.assign(mainData,Data);
    });

  return mainData;
}

module.exports = {
  importFile,
}
