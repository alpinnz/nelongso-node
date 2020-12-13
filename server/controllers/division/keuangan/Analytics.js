const Joi = require("joi");
const { resError, resSuccess } = require("./../../../helpers/HandleResponse");
const { Spreadsheet } = require("./../../../config/Spreadsheet");
const { json } = require("body-parser");

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

    if (sheetName == "TARGET OMZET") {
      spreadsheetData.forEach((e, i) => {
        let row = {};
        const dataOutlet = [];
        let no = 1;
        spreadsheetData[5].forEach((child, index) => {
          const title = titleKey(child);
          const textData = ["outlet", "regional"];

          if (textData.includes(title)) {
            row[title] = `${e[index]}`.toLowerCase();
          } else {
            dataOutlet.push({
              id: `${no}`,
              bulan: title,
              value: convertToFloat(e[index]),
            });
            no++;
          }
        });
        row["data"] = dataOutlet;

        if (i > 5) {
          data.push(row);
        } else {
          i = 6;
        }
      });
    } else {
      var noLast;
      spreadsheetData.forEach((e, i) => {
        let row = {};
        const dataOutlet = [];

        var no = 1;
        spreadsheetData[5].forEach((child, index) => {
          const title = titleKey(child);

          if (index < 3) {
            if (index == 0) {
              row[title] =
                `${e[index]}`.toLowerCase() || (noLast + 1).toString();
              noLast = parseInt(row[title]);
            } else {
              row[title] = `${e[index]}`.toLowerCase() || "";
            }
          } else {
            if (index == 3) {
              dataOutlet.push({
                id: `${no}`,
                column: "bulan",
                value: convertToFloat(e[index]),
              });
            } else {
              dataOutlet.push({
                id: `${no}`,
                column: title,
                value: convertToFloat(e[index]),
              });
            }

            no++;
          }
        });
        row["data"] = dataOutlet;
        if (i > 5) {
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
