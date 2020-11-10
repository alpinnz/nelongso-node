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
          spreadsheetId: "1FLKnkYsefLZnQI2zRujYJcdqepz91Tbu1FYd9U7E-K8",
        },
        {
          id: 11,
          spreadsheetId: null,
        },
        {
          id: 12,
          spreadsheetId: null,
        },
      ],
    },
  ],
  getSheetName: ["JABAR", "JATIM 1", "JATIM 2", "JATIM 3"],
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

    let data = [];

    const titleKey = (text) => {
      const string = `${text}`;
      const filter1 = string.substring(0, 1).replace(" ", "");
      const filter2 = string.substring(1);
      const titleText = filter1 + filter2;
      return titleText.replace(/ /g, "_").toLowerCase();
    };
    let outlets = [];
    spreadsheetData[4].forEach((e, i) => {
      if (i > 0 && e != null && e != "") {
        outlets.push(e);
      }
    });

    const columns = ["omzet", "lose_sale", "potensial_omzet"];

    const lineHeader = 5;
    spreadsheetData.forEach((e, i) => {
      if (i > lineHeader) {
        let row = {};
        row["tanggal"] = e[0];
        let data_outlet = [];
        let index = 0;
        outlets.forEach((child) => {
          let valueColumns = {};
          const title = titleKey(child);
          columns.forEach((item) => {
            index++;
            valueColumns[item] = e[index] || "";
          });
          data_outlet.push({
            nama: title,
            data: valueColumns,
          });
        });
        row["outlets"] = data_outlet;
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
