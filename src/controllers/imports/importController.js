const {checkType} = require('../../requests/import/typeImport');
const {importFile} = require('./typeFormat/csv');

const ImportExcel = (typeImport) => { return async (req,res) => { 
    const file  = req.file;
    if(file.mimetype === 'text/csv'){
      const uploadFile = await importFile(file,typeImport,res);
      if(uploadFile == false) {
        return res.status(400).json({Message : "Import Gagal Terjadi Kesalahan pada File"});
      }else{
        return res.status(200).json({message : "Import Berhasil"});
      }
    }
    if(file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){

    }
  }
}


module.exports = {
  ImportExcel,
}
