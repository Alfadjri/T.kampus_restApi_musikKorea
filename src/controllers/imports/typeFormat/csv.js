const xlsx = require('xlsx');
const {format} = require('date-fns');

const Artis = require('../../artisController');
const Grup  = require('../../grupController');
const Video = require('../../videoController');


const importFile = (file,type) => {
    const workBook = xlsx.read(file.buffer,{type:'buffer'});
    const workSheet = workBook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workBook.Sheets[workSheet]);
    sheetData.forEach((datas) => {
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
        mainData = Object.assign(mainData, Data);
        if(key == "Fanclub Name"){
          Data = {"fanclub name" : `${datas[key]}`}; 
        }else{
          Data = {"fanclub name" : null};
        }
        mainData = Object.assign(mainData,Data);
        if(key == "Short"){
          Data = {"short" : `${datas[key]}`};
        }else{
          Data = {"short" : null};
        }
        mainData = Object.assign(mainData,Data);
      }); 
      switch(type){
          case 'artis':
          break;
          case 'grup':
            Grup.createGrup(mainData);
          break;
          case 'video':
          break;
          default:
            return false;
      }
    });
}

const changeFormatData = (value) => {
  const date = new Date((value - 25569) * 86400 * 1000); // Mengonversi angka Excel menjadi Unix timestamp
  const formattedDate = format(date, 'yyyy-MM-dd');
  return formattedDate;
}

module.exports = {
  importFile,
}
