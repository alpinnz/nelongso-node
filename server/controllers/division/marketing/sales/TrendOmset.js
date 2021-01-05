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
      spreadsheetId: "12tlt1yLNj8xT-5ZG7AOhwzERBIO40WP25VwttoeXvzE",
    },
    {
      id: 2021,
      spreadsheetId: "1z4H3bqKmoArGUUFaKEsRMpdUJCvH0ApztBDs3aYwG14",
    },
  ],
  sheetName: [
    "TREND OMZET",
    "TREND OMZET OUTLET PER TAHUN",
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
  const titleText = `${filter1}${filter2}`;
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
    const dataYear = DataSet.year.find((e) => e.id == Body.year);
    if (!dataYear) return resError(res, `${Body.year} not found`, 200);
    const sheetName = DataSet.sheetName.find((e) => e == Body.sheet);

    if (!sheetName) {
      const dataSheet = DataSet.sheetName.join(", ");
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
    let no = 1;

    if (sheetName == "TREND OMZET") {
      const lineHeader = 5;
      spreadsheetData.forEach((e, i) => {
        if (i > lineHeader) {
          let row = {};
          row["id"] = `${no++}`;
          spreadsheetData[5].forEach((child, index) => {
            const title = titleKey(child);
            if (index == 1) {
              row["2_tahun_sebelum"] = convertToFloat(e[index]) || "0.0";
            } else if (index == 2) {
              row["2_tahun_sebelum_persentase"] =
                convertToFloat(e[index]) || "0.0";
            } else if (index == 3) {
              row["1_tahun_sebelum"] = convertToFloat(e[index]) || "0.0";
            } else if (index == 4) {
              row["1_tahun_sebelum_persentase"] =
                convertToFloat(e[index]) || "0.0";
            } else if (index == 5) {
              row["tahun_sekarang"] = convertToFloat(e[index]) || "0.0";
            } else if (index == 6) {
              row["tahun_sekarang_persentase"] =
                convertToFloat(e[index]) || "0.0";
            } else {
              row[title] = titleKey(e[index]) || "";
            }
            console.log(row);
          });

          data.push(row);
        } else {
          i = lineHeader + 1;
        }
      });
    } else if (sheetName == "TREND OMZET OUTLET PER TAHUN") {
      const lineHeader = 5;
      spreadsheetData.forEach((e, i) => {
        if (i > lineHeader) {
          let row = {};
          row["id"] = `${no++}`;
          spreadsheetData[5].forEach((child, index) => {
            const title = titleKey(child).toString() || "1";
            if (index == 2) {
              row["2_tahun_sebelum"] = convertToFloat(e[index]) || "0.0";
            } else if (index == 3) {
              row["2_tahun_sebelum_persentase"] =
                convertToFloat(e[index]) || "0.0";
            } else if (index == 4) {
              row["1_tahun_sebelum"] = convertToFloat(e[index]) || "0.0";
            } else if (index == 5) {
              row["1_tahun_sebelum_persentase"] =
                convertToFloat(e[index]) || "0.0";
            } else if (index == 6) {
              row["tahun_sekarang"] = convertToFloat(e[index]) || "0.0";
            } else if (index == 7) {
              row["tahun_sekarang_persentase"] =
                convertToFloat(e[index]) || "0.0";
            } else {
              row[title] = titleKey(e[index]) || "";
            }
            console.log(row);
          });

          data.push(row);
        } else {
          i = lineHeader + 1;
        }
      });
    } else {
      const lineHeader = 5;
      spreadsheetData.forEach((e, i) => {
        if (i > lineHeader) {
          let row = {};
          row["id"] = `${no++}`;
          spreadsheetData[5].forEach((child, index) => {
            const title = titleKey(child).toString() || "1";
            if (index == 2) {
              row["bulan_sekarang_2_tahun_sebelum"] =
                convertToFloat(e[index]) || "0.0";
            } else if (index == 3) {
              row["bulan_sekarang_2_tahun_sebelum_persentase"] =
                convertToFloat(e[index]) || "0.0";
            } else if (index == 4) {
              row["bulan_sekarang_1_tahun_sebelum"] =
                convertToFloat(e[index]) || "0.0";
            } else if (index == 5) {
              row["bulan_sekarang_1_tahun_sebelum_persentase"] =
                convertToFloat(e[index]) || "0.0";
            } else if (index == 6) {
              row["bulan_sekarang_tahun_sekarang"] =
                convertToFloat(e[index]) || "0.0";
            } else if (index == 7) {
              row["bulan_sekarang_tahun_sekarang_persentase"] =
                convertToFloat(e[index]) || "0.0";
            } else {
              row[title] = titleKey(e[index]) || "";
            }
            console.log(row);
          });

          data.push(row);
        } else {
          i = lineHeader + 1;
        }
      });
    }

    return resSuccess(res, `marketing -> admin -> ${sheetName}`, data);
  } catch (err) {
    return resError(res, err, 200);
  }
};
