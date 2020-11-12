const Joi = require("joi");
const { resError, resSuccess } = require("./../../../helpers/HandleResponse");
const { Spreadsheet } = require("./../../../config/Spreadsheet");

const DataSet = {
  getSpreadsheets: [
    {
      year: 2020,
      spreadsheetId: "1LNeZn26qZicFXoJixdMaoh_FdmhFKW0ppk31eX-OCoo",
    },
  ],
  getSheetName: [
    "TARGET OMZET",
    "JANUARI",
    "FEBRUARI",
    "MARET",
    "APRIL",
    "MEI",
    "JUNI",
    "JULI",
    "AGUSTUS",
    "SEPTEMBER",
    "OKTOBER",
    "NOVEMBER",
    "DESEMBER",
  ],
};

exports.ReadAll = async (req, res) => {
  const schema = Joi.object({
    year: Joi.number().min(2020).max(2021).required(),
    sheet: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.params);
  if (error) {
    return resError(res, error.details[0].message, 404);
  }
  const Body = value;
  try {
    const dataYear = DataSet.getSpreadsheets.find((e) => e.year == Body.year);
    if (!dataYear) return resError(res, `${Body.year} not found`, 404);
    const sheetName = DataSet.getSheetName.find((e) => e == Body.sheet);

    if (!sheetName) {
      const dataSheet = DataSet.getSheetName.join(", ");
      return resError(
        res,
        `${Body.sheet} not found ,available : ${dataSheet}`,
        404
      );
    }

    const { spreadsheetId } = dataYear;
    // Data SpreadSheet
    const spreadsheetData = await Spreadsheet(spreadsheetId, sheetName);
    // _________________

    let data = [];

    function convertToRupiah(angka) {
      var rupiah = "";
      var angkarev = angka.toString().split("").reverse().join("");
      for (var i = 0; i < angkarev.length; i++)
        if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
      return (
        "Rp. " +
        rupiah
          .split("", rupiah.length - 1)
          .reverse()
          .join("")
      );
    }

    function convertToAngka(rupiah) {
      let string = `${rupiah}`;
      let string2 = parseInt(string.replace(/,.*|[^0-9]/g, ""), 10);

      return string2 ? string2 : 0;
    }
    function convertToFloat(rupiah) {
      let string = `${rupiah}`;
      let string1 = string.replace(/[^,0-9]/g, "");
      let string2 = parseFloat(string1.replace(/,/g, ".")).toFixed(2) + "%";

      return string2;
    }
    function isNormalInteger(str) {
      return /^\+?(0|[1-9]\d*)$/.test(str);
    }

    if (sheetName != 'TARGET OMZET') {
      spreadsheetData.forEach((e, i) => {
        if (i > 5) {
          let row = {};
          spreadsheetData[5].forEach((child, index) => {
            // title
            const titleTemp = child[0].replace(" ", "") + child.substring(1);
            const titleTemp2 = titleTemp.replace(/ /g, "_").toLowerCase();
            const title =   titleTemp2;
  
            const strValue = `${e[index]}`;
            // value
            if (strValue.includes("Rp")) {
              row[title] = convertToRupiah(convertToAngka(strValue));
            } else if (strValue.includes("%")) {
              row[title] = convertToFloat(strValue);
            } else if (isNormalInteger(strValue)) {
              row[title] = parseInt(strValue);
            } else {
              row[title] = e[index] || "";
            }
          });
  
          data.push(row);
        } else {
          i = 6;
        }
      });
    } else {
      spreadsheetData.forEach((e, i) => {
        if (i > 5) {
          let row = {};
          spreadsheetData[5].forEach((child, index) => {
            // title
            const titleTemp = child[0].replace(" ", "") + child.substring(1);
            const titleTemp2 = titleTemp.replace(/ /g, "_").toLowerCase();
            const title = index == 3 ? "bulan" : titleTemp2;
  
            const strValue = `${e[index]}`;
            // value
            if (strValue.includes("Rp")) {
              row[title] = convertToRupiah(convertToAngka(strValue));
            } else if (strValue.includes("%")) {
              row[title] = convertToFloat(strValue);
            } else if (isNormalInteger(strValue)) {
              row[title] = parseInt(strValue);
            } else {
              row[title] = e[index] || "";
            }
          });
  
          data.push(row);
        } else {
          i = 6;
        }
      });
    }

    

    return resSuccess(res, `Keuangan -> ${sheetName}`, data);
  } catch (err) {
    return resError(res, err, 404);
  }
};
