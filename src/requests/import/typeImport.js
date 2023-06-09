
class typeImport {
  checkType(req,res,next) {
    const file = req.file;
    const code_status = 400;
    if(!file){
      return res.status(code_status).send("File tidak di temukan ");
    }
    if(file === 0){
      return res.status(code_status).send("File Kosong");
    }
    if(file.mimeType !==  'text/csv' || file.mimeType !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
      return res.status(code_status).send("Type FIle yang anda masukan tidak sesuai !!! hanya dapat xlsx dan csv");
    }
    next();
  }
}

module.exports = typeImport;

