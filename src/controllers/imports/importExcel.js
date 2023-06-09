const ExcelJS = require('exceljs');

class ImportExcel {
  mainXlsx(fileExcel) {
    const workbook = new ExcelJS.Workbook();
    workbook.xlsx.load(fileExcel)
      .then(() => {
        const worksheet = workbook.worksheets[0];
        const data = [];
        worksheet.eachRow(row => {
          const rowData = row.values.slice(1);
          data.push(rowData);
        });
        const isValid = validateFileData(data);
        if (isValid) {
        } else {
          // Handle case if data is not valid
        }
      })
      .catch(error => {
        // Handle error during workbook loading
      });
  }
}

module.exports = ImportExcel;
