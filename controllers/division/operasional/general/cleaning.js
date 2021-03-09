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

    return resSuccess(res, `Operasional -> ${sheetName}`, data);
  } catch (err) {
    return resError(res, err, 404);
  }
};
