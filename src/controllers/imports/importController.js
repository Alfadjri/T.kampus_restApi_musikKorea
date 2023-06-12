const {checkType} = require('../../requests/import/typeImport');
const {importFile} = require('./typeFormat/csv');

const ImportExcel = (typeImport) => { return (req,res) => { 
    const file  = req.file;
    checkType(file);
    if(file.mimetype === 'text/csv'){
      const uploadFile = importFile(file,typeImport);
      return res.status(200).send("Data berhasil di import");
    }
    if(file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){

    }
  }
}


module.exports = {
  ImportExcel,
}
