

const  checkType = (req,res,next) => {
    const file = req;
    if(!file){
      return res.status(400).send("File tidak di temukan ");
    }
    if(file === 0){
      return res.status(400).send("File Kosong");
    } 
    if(file.mimetype !== 'text/csv' && file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'  ){    
      return res.status(400).send("Type File yang anda masukan tidak sesuai !!! hanya dapat xlsx atau csv");
    }
    next;
}

module.exports = {
  checkType,
};

