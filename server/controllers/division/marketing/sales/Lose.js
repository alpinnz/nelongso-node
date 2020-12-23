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
          spreadsheetId: "1me7sO5-Wl3Rhzn1u16FHqkZyQupic6skEeHSlR_KGY4",
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
  getSheetName: ["REKAP OUTLET", "OUTLET", "MENU"],
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

const textConvert = (text) => {
  const string = `${text}`;
  const filter1 = string.substring(0, 1).replace(" ", "");
  const filter2 = string.substring(1);
  const titleText = filter1 + filter2;
  const text1 = titleText.replace(/ /g, "_").toLowerCase();
  return text1.replace(".", "");
};

exports.ReadAll = async (req, res) => {
  const schema = Joi.object({
    year: Joi.number().min(2020).max(2020).required(),
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
    // _________________

    let data = [];

    if (sheetName === "REKAP OUTLET") {
      const titles = [];

      spreadsheetData[5].forEach((e, i) => {
        if (i > 2) {
          if (e !== "" && e !== null) {
            titles.push(textConvert(e));
          }
        }
      });

      const subTitle = ["code", "nama", "harga_jual"];
      let id = 1;

      for (let index = 0; index < spreadsheetData.length; index++) {
        let row = {};
        let data_outlet = [];
        row["id"] = `${id}`;
        let i_title = 0;
        for (let i = 0; i < spreadsheetData[index].length; i++) {
          const e = spreadsheetData[index];

          if (i < 3) {
            row[subTitle[i]] = e[i] || "";
            console.log(row);
          } else {
            if (i % 2 == 0) {
              data_outlet.push({
                id: `${i_title + 1}`,
                outlet_name: titles[i_title] || "",
                qty: convertToFloat(e[i - 1]) || "0.0",
                total: convertToFloat(e[i]) || "0.0",
              });
              i_title++;
            }
          }
        }
        row["data"] = data_outlet;

        if (index > 7) {
          data.push(row);
          id++;
        }
      }
    } else if (sheetName === "OUTLET" || sheetName === "MENU") {
      let id = 1;
      spreadsheetData.forEach((e, i) => {
        let row = {};
        spreadsheetData[5].forEach((x, i_x) => {
          if (i_x == 0) {
            row["id"] = `${id}`;
            row[textConvert(x)] = e[i_x] || "";
          } else {
            row[textConvert(x)] = convertToFloat(e[i_x]) || "0.0";
          }
        });

        if (i > 5) {
          data.push(row);
          id++;
        }
      });
    } else {
      return resSuccess(res, `Keuangan -> ${sheetName}`, null);
    }
    return resSuccess(res, `Keuangan -> ${sheetName}`, data);
  } catch (err) {
    return resError(res, err, 404);
  }
};
