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
          spreadsheetId: "1li4Gz61V2YjsPDA3hxua5VWAiyCFHOwtj41zscYJ1i8",
        },
        {
          id: 2,
          spreadsheetId: "1DuXa8muVWF5Jsah8JEVTdWDneDezShfcdEEeq75cyGA",
        },
        {
          id: 3,
          spreadsheetId: "13oi-VcpTYPcGv0vn-234eqdrNhIqL6FAr9RzbbpE16A",
        },
        {
          id: 4,
          spreadsheetId: "1KA-R_8nhJXjGq2Gt0XHKfrSsSFlA4g1mDSUObktd3RA",
        },
        {
          id: 5,
          spreadsheetId: "16kfJd0ty_wh-K7piYbxKW6ODb0uODl8kcCd2esyWHBw",
        },
        {
          id: 6,
          spreadsheetId: "1INUtwugmpKD9R1NedAin_fXmLJp7pliXdXFhe79lFy0",
        },
        {
          id: 7,
          spreadsheetId: "1E5vHAp7iwwkw6omVvrnNC3X8qbVLMKHkc-IbD6KPyZw",
        },
        {
          id: 8,
          spreadsheetId: "1hIJf9N52P0jJoSp6vbjdbdM6ByM58y_ZkasCkNTHlc4",
        },
        {
          id: 9,
          spreadsheetId: "1Wukeg3-iqNR6BHPJMeSZxjwaXoAGNiaVIexyqy7OMSE",
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
    {
      id: 2021,
      month: [
        {
          id: 1,
          spreadsheetId: "11tld-vIewcb6dAeJDINv9ZQygOPYD-gA83lph0qVUTs",
        },
        {
          id: 2,
          spreadsheetId: "12f6AVX0jimun4_uk11fmhiVZCXyB7gGmLH6g7miAXjs",
        },
        {
          id: 3,
          spreadsheetId: "1OujSSx38tDX4lTqyaG5KQkPcfIKITeegSlqR69S8Bf0",
        },
        {
          id: 4,
          spreadsheetId: "13p9NoH2Z_Hw_Z6f797SqmZpeACq7zlAcY4X9MaJXsNI",
        },
        {
          id: 5,
          spreadsheetId: "1Ie3SUL9VEPjefgRBAJERQztizL3pdwm425x4yoPPJGc",
        },
        {
          id: 6,
          spreadsheetId: "1iPDUhr9zodDvhdJnvv5OyIev4MSUTEY9rzMHyUcZf_g",
        },
        {
          id: 7,
          spreadsheetId: "1ImipK-eWkKu-zrCbbu3I26l0cCK8yYnMxmyTHTqJRNA",
        },
        {
          id: 8,
          spreadsheetId: "1myAO9XWrrkJE2FUvQ1GlFyfVK83yYGCyOLV9vnNVMvk",
        },
        {
          id: 9,
          spreadsheetId: "1Pu8cP9XPZbegve-I1LVR2_p_eA2n6F0HFCQSeLAQkeo",
        },
        {
          id: 10,
          spreadsheetId: "1CbJ-FDFnB2XM_GNmpskjju4Wiaty-hOdKkUIxQaBF_w",
        },
        {
          id: 11,
          spreadsheetId: "1nRkrEXjAxz5i9okjoH7UymD9AMldPWQYzsmMntpK97k",
        },
        {
          id: 12,
          spreadsheetId: "1jjlT8pTferEnJ72ZoFtf4h-ADAV8QYWZjlNWAzf2Czs",
        },
      ],
    },
  ],
  sheetName: [
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
  const titleText1 = titleText.replace(/ /g, "_").toLowerCase();
  if (titleText1 === "undefined") {
    return "";
  } else {
    return titleText1;
  }
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
    if (!spreadsheetData) {
      return resError(res, `spreadsheetData not found`, 200);
    }

    // _________________

    const newSpreadsheetData = spreadsheetData.map((e) => e.slice(1));

    let data = [];

    if (
      sheetName == "KETERCAPAIAN OMZET" ||
      sheetName == "KETERCAPAIAN KUNJUNGAN" ||
      sheetName == "KETERCAPAIAN BASKET SIZE" ||
      sheetName == "BULAN SEBELUM VS BULAN SEKARANG"
      // ||
      // sheetName == "KETERCAPAIAN JATIM 1" ||
      // sheetName == "KETERCAPAIAN JATIM 2" ||
      // sheetName == "KETERCAPAIAN JATIM 3" ||
      // sheetName == "KETERCAPAIAN JABAR"
    ) {
      const lineHeader = 6;
      newSpreadsheetData.forEach((e, i) => {
        if (i > lineHeader) {
          let row = {};
          newSpreadsheetData[6].forEach((child, index) => {
            const title = titleKey(child);
            if (
              title === "nama_outlet" ||
              title === "no" ||
              title === "regional"
            ) {
              row[title] = titleKey(e[index]) || "";
            } else if (title === "%") {
              row["persentase"] = convertToFloat(e[index]) || "0.0";
            } else {
              row[title] = convertToFloat(e[index]) || "0.0";
            }
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
              row["omzet_1_bulan_sebelum"] = convertToFloat(e[index]) || "0.0";
            } else if (index == 3) {
              row["omzet_bulan_sekarang"] = convertToFloat(e[index]) || "0.0";
            } else {
              row[title] = titleKey(e[index]) || "";
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

            if (
              title === "nama_outlet" ||
              title === "no" ||
              title === "regional"
            ) {
              row[title] = titleKey(e[index]) || "";
            } else if (title === "%") {
              row["persentase"] = convertToFloat(e[index]) || "0.0";
            } else {
              row[title] = convertToFloat(e[index]) || "0.0";
            }
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
