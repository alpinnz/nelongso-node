const { resError, resSuccess } = require("./../../../helpers/HandleResponse");
const { Spreadsheet } = require("./../../../config/Spreadsheet");

exports.ReadAll = async (req, res) => {
  try {
    const spreadsheetId = "1rXNbhbMoIfMgj4ngn7TlDUTdMRjdDNJWVoZhmKONS-0";
    const sheetName = "DATA MITRA";

    // Data SpreadSheet
    const spreadsheetData = await Spreadsheet(spreadsheetId, sheetName);
    // _________________

    let data = [];

    spreadsheetData.forEach((e, i) => {
      if (i > 6) {
        let row = {};
        spreadsheetData[6].forEach((child, index) => {
          // title
          const titleTemp = child[0].replace(" ", "") + child.substring(1);
          const titleTemp2 = titleTemp.replace(/ /g, "_").toLowerCase();
          const title = titleTemp2;

          row[title] = e[index] || "";
        });

        data.push(row);
      } else {
        i = 7;
      }
    });

    return resSuccess(res, `Keuangan -> ${sheetName}`, data);
  } catch (err) {
    return resError(res, err, 404);
  }
};
