const Joi = require("joi");
const {
  resError,
  resSuccess,
} = require("./../../../../helpers/HandleResponse");
const { Spreadsheet } = require("./../../../../config/Spreadsheet");

const DataSet = {
  year: [
    {
      id: 2020,
      month: [
        {
          id: 1,
          spreadsheetId: "1OXkNuHIp539VKXrrDnB-yllczdZdIXlNomgJEMNmn_M",
        },
        {
          id: 2,
          spreadsheetId: "1x-XPpFqGPIsSTlMVKCarOMDuHdabQUlwGdL41z7tsu8",
        },
        {
          id: 3,
          spreadsheetId: "18DeOszMcaE9_yLy1bTxDayjIifeokRQGCoVi6dKGDYQ",
        },
        {
          id: 4,
          spreadsheetId: "1I7qyAuPSI8eGknljWYsm5gCK2FK862vDOseUfZ_WQ24",
        },
        {
          id: 5,
          spreadsheetId: "1THS2qTxg7vwpJO-6Onp2e0Wp7caPBLo_8bnBcx6tDXc",
        },
        {
          id: 6,
          spreadsheetId: "1T0tytQp31vvpDaTRXBIOPYq5uqbcApogaLCzdzA2SHI",
        },
        {
          id: 7,
          spreadsheetId: "1Yft8BeOIrXlcClzlt2zZDT-eB5m9rZZUWlChkKDwb6U",
        },
        {
          id: 8,
          spreadsheetId: "1nZ6-GeK7l6-BacrWA6uyHzGbL3lrIeyRwLj__BltBW8",
        },
        {
          id: 9,
          spreadsheetId: "1ZTqZDKkQFmvpZ_qBgsKw29Ks07irUXHxsxjwnD2b0LM",
        },
        {
          id: 10,
          spreadsheetId: "1me7sO5-Wl3Rhzn1u16FHqkZyQupic6skEeHSlR_KGY4",
        },
        {
          id: 11,
          spreadsheetId: "1rC4RZghoB5_SA_J3o0oycfZxtDAjyFIhloJ1ICAofg8",
        },
        {
          id: 12,
          spreadsheetId: "1retqae9CKGsyb2TgRnRer21K4gE10YLnmFNyaiN2aE0",
        },
      ],
    },
  ],
  sheetName: ["REKAP OUTLET", "OUTLET", "MENU"],
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
    year: Joi.number().min(2020).max(2021).required(),
    sheet: Joi.string().required(),
    month: Joi.number().min(1).max(12).required(),
  });

  const { error, value } = schema.validate(req.params);
  if (error) {
    return resError(res, error.details[0].message, 200);
  }
  const Body = value;
  try {
    const dataYear = DataSet.year.find((e) => e.id == Body.year);
    if (!dataYear) return resError(res, `${Body.year} not found`, 200);
    const dataMonth = dataYear.month.find((e) => e.id == Body.month);
    if (!dataMonth) return resError(res, `${Body.month} not found`, 200);
    const sheetName = DataSet.sheetName.find((e) => e == Body.sheet);

    if (!sheetName) {
      const dataSheet = DataSet.sheetName.join(", ");
      return resError(
        res,
        `${Body.sheet} not found ,available : ${dataSheet}`,
        200
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
    return resError(res, err, 200);
  }
};
