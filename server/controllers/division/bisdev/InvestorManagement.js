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

    spreadsheetData.forEach((e, i) => {
      if (i > 6) {
        let row = {};
        spreadsheetData[6].forEach((child, index) => {
          // title
          const titleTemp = child[0].replace(" ", "") + child.substring(1);
          const titleTemp2 = titleTemp.replace(/ /g, "_").toLowerCase();
          const title = titleTemp2;

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
        i = 7;
      }
    });

    return resSuccess(res, `Keuangan -> ${sheetName}`, data);
  } catch (err) {
    return resError(res, err, 404);
  }
};
