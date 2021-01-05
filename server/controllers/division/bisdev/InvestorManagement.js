const Joi = require("joi");
const { resError, resSuccess } = require("./../../../helpers/HandleResponse");
const { Spreadsheet } = require("./../../../config/Spreadsheet");

const DataSet = {
  year: [
    {
      id: 2020,
      spreadsheetId: "1rXNbhbMoIfMgj4ngn7TlDUTdMRjdDNJWVoZhmKONS-0",
      outlet_profiles: {
        spreadsheetId: "1Vh-GMekt7FxrlN8_06XRT7GMkzVg1xNJCrsjxiliUkQ",
      },
    },
    {
      id: 2021,
      spreadsheetId: "1P4ZDjXtH9qkK-zTYrEDtqUIYPdPVCJaocROOcbOl7cM",
      outlet_profiles: {
        spreadsheetId: "1AAirKA7W7QsOoyyHD0mqSaCFrOOcEOXP0MiUAQGSrVk",
      },
    },
  ],
};

const OutletProfiles = async (spreadsheetId) => {
  const sheetName = "DATA OUTLET";
  try {
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

    return data;
  } catch (err) {
    return null;
  }
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

    const { spreadsheetId, outlet_profiles } = dataYear;
    const sheetName = "DATA MITRA";
    // Data SpreadSheet
    const spreadsheetData = await Spreadsheet(spreadsheetId, sheetName);
    // _________________

    const outletProfiles = await OutletProfiles(outlet_profiles.spreadsheetId);

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

    const newData = data.map((e) => {
      const listOutlet = outletProfiles.filter(
        (x) => x.nama_mitra == e.nama_mitra
      );
      e["outlets"] = listOutlet;
      return e;
    });

    return resSuccess(res, `Bisdev -> ${sheetName}`, newData);
  } catch (err) {
    return resError(res, err, 200);
  }
};
