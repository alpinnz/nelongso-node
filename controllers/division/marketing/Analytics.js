const Joi = require("joi");
const { resError, resSuccess } = require("./../../../helpers/HandleResponse");
const { Spreadsheet } = require("./../../../config/Spreadsheet");
const { json } = require("body-parser");

const DataSet = {
  getSpreadsheets: [
    {
      year: 2020,
      spreadsheetId: "1-MsYMTuv-nnhw6kQKJzRwdLGuWuBu-d-CvdiM3TtiE4",
    },
    {
      year: 2021,
      spreadsheetId: "1csPWbsB8zcg6SjE8biDgRW3zT1X9TqI4MA0L_vvIAFY",
    },
  ],
  getSheetName: ["TARGET OMZET", "TARGET KUNJUNGAN", "TARGET BASKET SIZE"],
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
    if (!spreadsheetData) {
      return resError(res, `spreadsheetData not found`, 200);
    }

    // _________________

    let data = [];

    const lineHeader = 5;
    let no = 1;
    spreadsheetData.forEach((e, i) => {
      if (i > lineHeader) {
        let row = {};
        row["id"] = `${no++}`;
        spreadsheetData[5].forEach((child, index) => {
          const title = titleKey(child);

          if (title === "outlet" || title === "regional") {
            row[title] = `${e[index]}`.toLowerCase() || "";
          } else {
            row[title] = convertToFloat(e[index]) || "0.0";
          }
        });

        data.push(row);
      } else {
        i = lineHeader + 1;
      }
    });

    const temp = data.map((e) => {
      return {
        id: e.id,
        outlet_name: e.outlet,
        regional: e.regional,
        data: [],
      };
    });

    data.forEach((parent) => {
      let id = 1;
      const i = temp.findIndex((e) => e.outlet_name === parent.outlet);
      const tempArray = [];
      for (const key in parent) {
        const cancel = ["id", "outlet", "regional"];
        if (!cancel.includes(key)) {
          tempArray.push({
            id: `${id++}`,
            month: `${key}`,
            value: `${parent[key]}`,
          });
        }
      }
      temp[i]["data"] = tempArray;
    });

    // return res.json(temp);
    data = temp;

    return resSuccess(res, `marketing -> admin -> ${sheetName}`, data);
  } catch (err) {
    return resError(res, err, 200);
  }
};
