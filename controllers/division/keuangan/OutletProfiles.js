const Joi = require("joi");
const { resError, resSuccess } = require("./../../../helpers/HandleResponse");
const { Spreadsheet } = require("./../../../config/Spreadsheet");

const DataSet = {
  year: [
    {
      id: 2020,
      spreadsheetId: "1aeL8_r9cQ9wdlNp660Ld2LeFD_SpD4lApmmdeN2eNCg",
    },
  ],
};

exports.ReadAll = async (req, res) => {
  const schema = Joi.object({
    year: Joi.number().min(2020).max(2021).required(),
  });

  const { error, value } = schema.validate(req.params);
  if (error) {
    return resError(res, error.details[0].message, 200);
  }
  const Body = value;
  try {
    const dataYear = DataSet.year.find((e) => e.id == Body.year);
    if (!dataYear) return resError(res, `${Body.year} not found`, 200);

    const sheetName = "DATA OUTLET";

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

    spreadsheetData.forEach((e, i) => {
      if (i > 4) {
        let row = {};
        spreadsheetData[4].forEach((child, index) => {
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
        i = 6;
      }
    });

    return resSuccess(res, `Keuangan -> ${sheetName}`, data);
  } catch (err) {
    return resError(res, err, 200);
  }
};
