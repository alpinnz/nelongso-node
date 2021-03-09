const { resError, resSuccess } = require("./../../../helpers/HandleResponse");
const { Spreadsheet } = require("./../../../config/Spreadsheet");
const Joi = require("joi");

const DataSet = {
  getSpreadsheets: [
    {
      year: 2020,
      spreadsheetId: "1kVvxklylcmkHC48_LMB8gOCCLdCAFTzfVYRI5shZNv0",
    },
  ],
  getSheetName: ["KURIKULUM"],
};

exports.ReadAll = async (req, res) => {
  const schema = Joi.object({
    year: Joi.number().min(2020).max(2021).required(),
    sheet: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.params);
  if (error) {
    return resError(res, error.details[0].message, 200);
  }
  const Body = value;
  try {
    const dataYear = DataSet.getSpreadsheets.find((e) => e.year == Body.year);
    if (!dataYear) return resError(res, `${Body.year} not found`, 200);
    const sheetName = DataSet.getSheetName.find((e) => e == Body.sheet);

    if (!sheetName) {
      const dataSheet = DataSet.getSheetName.join(", ");
      return resError(
        res,
        `${Body.sheet} not found ,available : ${dataSheet}`,
        200
      );
    }

    const { spreadsheetId } = dataYear;

    // Data SpreadSheet
    const spreadsheetData = await Spreadsheet(spreadsheetId, sheetName);
    // _________________

    let data = [];
    let id = 1;

    spreadsheetData.forEach((e, i) => {
      let row = {
        id: `${id || ""}`,
        kode: `${e[0] || ""}`,
        materi: `${e[1] || ""}`,
        standart: `${e[2] || ""}`,
        kopetensi: `${e[3] || ""}`,
        indikator: `${e[4] || ""}`.split("\n"),
        kasir: `${e[5] || ""}`,
        kapten: `${e[6] || ""}`,
        waiters: `${e[7] || ""}`,
        ass_cheff: `${e[8] || ""}`,
        cheff: `${e[9] || ""}`,
        manager: `${e[10] || ""}`,
        op: `${e[11] || ""}`,
        prod: `${e[12] || ""}`,
        mkt: `${e[13] || ""}`,
        keu: `${e[14] || ""}`,
      };
      if (i > 6) {
        data.push(row);
        id++;
      }
    });

    return resSuccess(res, `Operasional -> ${sheetName}`, data);
  } catch (err) {
    return resError(res, err, 200);
  }
};
