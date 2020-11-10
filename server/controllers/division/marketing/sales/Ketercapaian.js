const Joi = require("joi");
const {
  resError,
  resSuccess,
} = require("./../../../../helpers/HandleResponse");
const { Spreadsheet } = require("./../../../../config/Spreadsheet");

const DataSet = {
  getSpreadsheets: [
    {
      year: 2020,
      month: [
        {
          id: 1,
          spreadsheetId: null,
        },
        {
          id: 2,
          spreadsheetId: null,
        },
        {
          id: 3,
          spreadsheetId: null,
        },
        {
          id: 4,
          spreadsheetId: null,
        },
        {
          id: 5,
          spreadsheetId: null,
        },
        {
          id: 6,
          spreadsheetId: null,
        },
        {
          id: 7,
          spreadsheetId: null,
        },
        {
          id: 8,
          spreadsheetId: null,
        },
        {
          id: 9,
          spreadsheetId: null,
        },
        {
          id: 10,
          spreadsheetId: "1iaIFeqHVOsf8LpkJeoLaR3QwCl0fxNNaR99gfUtragE",
        },
        {
          id: 11,
          spreadsheetId: "1ACAFQRo8ioDJSdXRCz_sdjC0LAwwv075gEzpFmLMC9M",
        },
        {
          id: 12,
          spreadsheetId: "1px4E57U0vgXo64HHSOSRJ2l_SxmXDxfM4NUQggCQbfg",
        },
      ],
    },
  ],
  getSheetName: [
    "KETERCAPAIAN OMZET",
    "KETERCAPAIAN KUNJUNGAN",
    "KETERCAPAIAN BASKET SIZE",
    "KETERCAPAIAN JATIM 1",
    "KETERCAPAIAN JATIM 2",
    "KETERCAPAIAN JATIM 3",
    "KETERCAPAIAN JABAR",
    "KETERCAPAIAN ALL REGIONAL",
    "BULAN SEBELUM VS BULAN SEKARANG",
    "KESEHATAN OUTLET",
  ],
};

exports.ReadAll = async (req, res) => {
  const schema = Joi.object({
    year: Joi.number().min(2020).max(2021).required(),
    sheet: Joi.string().required(),
    month: Joi.number().min(1).max(12).required(),
  });

  const { error, value } = schema.validate(req.params);
  if (error) {
    return resError(res, error.details[0].message, 404);
  }
  const Body = value;
  try {
    const dataYear = DataSet.getSpreadsheets.find((e) => e.year == Body.year);
    if (!dataYear) return resError(res, `${Body.year} not found`, 404);
    const dataMonth = dataYear.month.find((e) => e.id == Body.month);
    if (!dataMonth) return resError(res, `${Body.month} not found`, 404);
    const sheetName = DataSet.getSheetName.find((e) => e == Body.sheet);

    if (!sheetName) {
      const dataSheet = DataSet.getSheetName.join(", ");
      return resError(
        res,
        `${Body.sheet} not found ,available : ${dataSheet}`,
        404
      );
    }

    const { spreadsheetId } = dataMonth;
    // Data SpreadSheet
    const spreadsheetData = await Spreadsheet(spreadsheetId, sheetName);
    if (!spreadsheetData) {
      return resError(res, `spreadsheetData not found`, 404);
    }

    // _________________

    const newSpreadsheetData = spreadsheetData.map((e) => e.slice(1));

    let data = [];

    const titleKey = (text) => {
      const string = `${text}`;
      const filter1 = string.substring(0, 1).replace(" ", "");
      const filter2 = string.substring(1);
      const titleText = filter1 + filter2;
      return titleText.replace(/ /g, "_").toLowerCase();
    };
    if (
      sheetName == "KETERCAPAIAN OMZET" ||
      sheetName == "KETERCAPAIAN KUNJUNGAN" ||
      sheetName == "KETERCAPAIAN BASKET SIZE" ||
      sheetName == "BULAN SEBELUM VS BULAN SEKARANG"
    ) {
      const lineHeader = 6;
      newSpreadsheetData.forEach((e, i) => {
        if (i > lineHeader) {
          let row = {};
          newSpreadsheetData[6].forEach((child, index) => {
            const title = titleKey(child);

            row[title] = e[index] || "";
          });

          data.push(row);
        } else {
          i = lineHeader + 1;
        }
      });
    } else if (sheetName == "KESEHATAN OUTLET") {
      const lineHeader = 6;
      newSpreadsheetData.forEach((e, i) => {
        if (i > lineHeader) {
          let row = {};
          newSpreadsheetData[6].forEach((child, index) => {
            const title = titleKey(child);
            if (index == 2) {
              row["omzet_bulan_" + (Body.year - 1)] = e[index] || "";
            } else if (index == 3) {
              row["omzet_bulan_" + Body.year] = e[index] || "";
            } else {
              row[title] = e[index] || "";
            }
          });

          data.push(row);
        } else {
          i = lineHeader + 1;
        }
      });
    } else {
      const lineHeader = 5;
      newSpreadsheetData.forEach((e, i) => {
        if (i > lineHeader) {
          let row = {};
          newSpreadsheetData[5].forEach((child, index) => {
            const title = titleKey(child);
            row[title] = e[index] || "";
          });

          data.push(row);
        } else {
          i = lineHeader + 1;
        }
      });
    }

    return resSuccess(res, `marketing -> admin -> ${sheetName}`, data);
  } catch (err) {
    return resError(res, err, 404);
  }
};
