const xlsx = require('xlsx');
const Artis = require('../../artisController');
const Grup  = require('../../grupController');
const Video = require('../../videoController');


const importFile = (type) => { return  (file) => {
    const workBook = xlsx.read(file.buffer,{type:'buffer'});
    const workSheet = workBook.SheetNames[0];
    // get json array
    const sheetData = xlsx.utils.sheet_to_json(workBook.Sheets[workSheet]);

    sheetData.forEach((datas) => {
      const data = Object.keys(datas).sort();
      data.forEach((key) => {
        const value = datas[key];
        console.log(`${key}:${value}`);
      });
      console.log('-----');
    });
  }
}

module.exports = {
  importFile,
}
