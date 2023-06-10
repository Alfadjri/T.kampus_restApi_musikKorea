
class typeImport {
  checkType(req,res,next) {
    const file = req;
    if(!file){
      res.status(400).send("File tidak di temukan ");
    }
    if(file === 0){
      res.status(400).send("File Kosong");
    } 
    if(file.mimetype !== 'text/csv' && file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'  ){    
      res.status(400).send("Type File yang anda masukan tidak sesuai !!! hanya dapat xlsx atau csv");
    }
    next;
  }
}

module.exports = typeImport;

