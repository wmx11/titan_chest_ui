import * as XLSX from 'xlsx';

const downloadExcel = (data) => {
  if (!data) {
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, 'Rebases.xlsx');
};

export default downloadExcel;
