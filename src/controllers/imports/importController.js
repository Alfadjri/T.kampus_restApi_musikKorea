const validateFile = require('../../requests/import/typeImport');
const importCsv = require('./typeFormat/csv');

const ImportExcel = (typeImpor) => { return (req,res) => {
    
    const isValidate = new validateFile();
    const file  = req.file;
    isValidate.checkType(file,res);
    console.log(typeImpor);
    if(file.mimetype === 'text/csv'){
      const uploadFile = importCsv.importFile(file,typeImport);
    }
    if(file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){

    }
  }
}


module.exports = {
  ImportExcel,
}
