const Joi = require("joi");
const { resError, resSuccess } = require("./../../../helpers/HandleResponse");
const { Spreadsheet } = require("./../../../config/Spreadsheet");

const DataSet = {
  getSpreadsheets: [
    {
      year: 2020,
      spreadsheetId: "1-MsYMTuv-nnhw6kQKJzRwdLGuWuBu-d-CvdiM3TtiE4",
    },
  ],
  getSheetName: ["TARGET OMZET", "TARGET KUNJUNGAN", "TARGET BASKET SIZE"],
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
    if (!spreadsheetData) {
      return resError(res, `spreadsheetData not found`, 404);
    }

    // _________________

    let data = [];

    const titleKey = (text) => {
      const string = `${text}`;
      const filter1 = string.substring(0, 1).replace(" ", "");
      const filter2 = string.substring(1);
      const titleText = filter1 + filter2;
      return titleText.replace(/ /g, "_").toLowerCase();
    };

    const lineHeader = 5;
    spreadsheetData.forEach((e, i) => {
      if (i > lineHeader) {
        let row = {};
        spreadsheetData[5].forEach((child, index) => {
          const title = titleKey(child);

          row[title] = e[index] || "";
        });

        data.push(row);
      } else {
        i = lineHeader + 1;
      }
    });

    return resSuccess(res, `marketing -> admin -> ${sheetName}`, data);
  } catch (err) {
    return resError(res, err, 404);
  }
};
