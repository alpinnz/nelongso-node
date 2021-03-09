const {
  resError,
  resSuccess,
} = require("./../../../../helpers/HandleResponse");
const { Spreadsheet } = require("./../../../../config/Spreadsheet");
const Joi = require("joi");

const DataSet = {
  getSpreadsheets: [
    {
      year: 2020,
      spreadsheetId: "1KJvgL44A31QIGcVyldwsJVfW47yUqES2H07QtkHk10k",
    },
  ],
  getSheetName: ["REKAP"],
};

function convertToFloat(rupiah) {
  let string = `${rupiah}`;
  let string1 = string.replace(/[^,0-9]/g, "");
  let string2 = parseFloat(string1.replace(/,/g, ".")).toFixed(2);
  if (string2 == "NaN") {
    return "0.00";
  } else {
    return string2;
  }
}

const titleKey = (text) => {
  const string = `${text}`;
  const filter1 = string.substring(0, 1).replace(" ", "");
  const filter2 = string.substring(1);
  const titleText = filter1 + filter2;
  return titleText.replace(/ /g, "_").toLowerCase();
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
    let outlets = [];

    spreadsheetData[4].forEach((e, i) => {
      if (i > 3 && e !== "" && e !== null) {
        outlets.push(titleKey(e));
      }
    });
    let headers = ["no", "nama_barang", "jenis_barang", "code"];

    for (let i = 6; i < spreadsheetData.length; i++) {
      let row = {};
      let temp_outlets = [];
      let i_outlet = 0;
      for (let j = 0; j < spreadsheetData[i].length; j++) {
        if (j < 4) {
          row[headers[j]] = spreadsheetData[i][j];
        } else {
          temp_outlets.push({
            id: `${i_outlet + 1}`,
            name_outlet: outlets[i_outlet],
            standar_jumlah: spreadsheetData[i][j] || "0",
            crosscheck: spreadsheetData[i][j + 1] || "0",
          });
          j++;
          i_outlet++;
        }
      }
      row["data"] = temp_outlets;
      data.push(row);
    }
    // return res.json(data);

    return resSuccess(res, `Operasional -> ${sheetName}`, data);
  } catch (err) {
    return resError(res, err, 404);
  }
};
