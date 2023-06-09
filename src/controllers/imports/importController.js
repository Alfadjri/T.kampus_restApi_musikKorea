
const ImportExcel = (req,res) => {
  const file  = req.file.file;
  console.log(file);

}
module.exports = {
  ImportExcel,
}
