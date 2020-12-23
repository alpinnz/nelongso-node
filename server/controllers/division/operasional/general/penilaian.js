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
      spreadsheetId: "1A4Vpdix2giHESPrQTr3uSx5W1CzLY_-cVQA8qY9tVkQ",
    },
  ],
  getSheetName: [
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
    "REKAP FINAL ALL",
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
    if (sheetName === "REKAP FINAL ALL") {
      spreadsheetData.forEach((e, i) => {
        let row = {
          outlet: `${e[0] || ""}`,
          regional: `${e[1] || ""}`,
          bulan: `${e[2] || ""}`,
          penilaian_1: `${e[3] || ""}`,
          score: {
            ringkas_1: `${e[4] || ""}`,
            ringkas_2: `${e[5] || ""}`,
            ringkas_3: `${e[6] || ""}`,
            ringkas_4: `${e[7] || ""}`,
            ringkas_5: `${e[8] || ""}`,
            ringkas_6: `${e[9] || ""}`,
            rapi_1: `${e[10] || ""}`,
            rapi_2: `${e[11] || ""}`,
            rapi_3: `${e[12] || ""}`,
            rapi_4: `${e[13] || ""}`,
            rapi_5: `${e[14] || ""}`,
            rapi_6: `${e[15] || ""}`,
            resik_1: `${e[16] || ""}`,
            resik_2: `${e[17] || ""}`,
            resik_3: `${e[18] || ""}`,
            resik_4: `${e[19] || ""}`,
            resik_5: `${e[20] || ""}`,
            resik_6: `${e[21] || ""}`,
          },
          total_nilai: `${e[22] || ""}`,
          rata_nilai: `${e[23] || ""}`,
          nilai: `${e[24] || ""}`,
        };
        if (i > 5) {
          data.push(row);
        }
      });
    } else {
      spreadsheetData.forEach((e, i) => {
        let row = {
          outlet: `${e[0] || ""}`,
          regional: `${e[1] || ""}`,
          bulan: `${e[2] || ""}`,
          penilaian_1: `${e[3] || ""}`,
          score: {
            ringkas_1: `${e[4] || ""}`,
            ringkas_2: `${e[5] || ""}`,
            ringkas_3: `${e[6] || ""}`,
            ringkas_4: `${e[7] || ""}`,
            ringkas_5: `${e[8] || ""}`,
            ringkas_6: `${e[9] || ""}`,
            rapi_1: `${e[10] || ""}`,
            rapi_2: `${e[11] || ""}`,
            rapi_3: `${e[12] || ""}`,
            rapi_4: `${e[13] || ""}`,
            rapi_5: `${e[14] || ""}`,
            rapi_6: `${e[15] || ""}`,
            resik_1: `${e[16] || ""}`,
            resik_2: `${e[17] || ""}`,
            resik_3: `${e[18] || ""}`,
            resik_4: `${e[19] || ""}`,
            resik_5: `${e[20] || ""}`,
            resik_6: `${e[21] || ""}`,
          },
          total_nilai: `${e[22] || ""}`,
          rata_nilai: `${e[23] || ""}`,
          nilai: `${e[24] || ""}`,
        };
        if (i > 5) {
          data.push(row);
        }
      });
    }

    return resSuccess(res, `Operasional -> ${sheetName}`, data);
  } catch (err) {
    return resError(res, err, 404);
  }
};
