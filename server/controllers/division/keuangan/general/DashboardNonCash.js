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
          spreadsheetId: "1u2WwVmd_YeSNpDpuNQAanGZQTLkgY3bHDYdS6TJjopI",
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
  getSheetName: [
    "GORESTO",
    "GRABRESTO",
    "GOJEK & GRAB",
    "SALDO GORESTO",
    "SALDO GRABRESTO",
  ],
};

// const outlets = [
//   "bekasi",
//   "depok",
//   "jatinangor",
//   "kiaracondong",
//   "koposayati",
//   "setia budi",
//   "batu",
//   "blimbing",
//   "bululawang",
//   "buring",
//   "dieng",
//   "kepanjen",
//   "pakis",
//   "sawojajar",
//   "sigura-gura",
//   "singosari",
//   "suhat_new",
//   "sukun",
//   "sulfat",
//   "trunojoyo",
//   "turen",
//   "um",
//   "unmuh",
//   "dharmawangsa",
//   "ketintang",
//   "klampis",
//   "mulyosari",
//   "panjang_jiwo",
//   "siwalan_kerto",
//   "tropodo",
//   "utang",
//   "upn",
//   "wijaya_kusuma",
//   "wiyung",
//   "bali_1_tukad_barito",
//   "bali_2_dewi_sari",
//   "gresik",
//   "jember_1_mastrip",
//   "jember_2_unej",
//   "jombang",
//   "kediri",
//   "madiun",
//   "mojokerto",
//   "pare",
//   "pasuruan",
//   "sidoarjo",
//   "tulungagung",
//   "yogyakarta",
// ];

function convertToAngka(rupiah) {
  let string = `${rupiah}`;
  let string2 = parseInt(string.replace(/,.*|[^0-9]/g, ""), 10);

  return string2 ? string2 : 0;
}

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

function isNormalInteger(str) {
  return /^\+?(0|[1-9]\d*)$/.test(str);
}

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
    // _________________
    const titleKey = (text) => {
      const string = `${text}`;
      const filter1 = string.substring(0, 1).replace(" ", "");
      const filter2 = string.substring(1);
      const titleText = filter1 + filter2;
      return titleText.replace(/ /g, "_").toLowerCase();
    };

    let data = [];
    // "sisal_saldo_bulan",
    if (sheetName == "GORESTO") {
      let outlets = [];
      spreadsheetData[4].forEach((e, i) => {
        if (i > 0 && e != null && e != "") {
          outlets.push(e);
        }
      });
      outlets.push("total");
      const columns = ["gopay", "rekening", "selisih"];

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
              valueColumns[item] = convertToFloat(e[index]) || "";
            });
            data_outlet.push({
              nama_outlet: title,
              data: valueColumns,
            });
          });
          row["outlet"] = data_outlet;
          data.push(row);
        } else {
          i = lineHeader + 1;
        }
      });

      const array = [];
      data[0]["outlet"].forEach((e, i) => {
        array.push({
          id: i,
          nama_outlet: e["nama_outlet"] || "",
          data: [],
        });
      });
      data.forEach((e, i) => {
        e["outlet"].forEach((item, index) => {
          item["data"]["id"] = e["tanggal"];
          array[index]["data"].push(item["data"]);
        });
      });

      data = array;
    } else if (sheetName == "GRABRESTO") {
      let outlets = [];
      spreadsheetData[4].forEach((e, i) => {
        if (i > 0 && e != null && e != "") {
          outlets.push(e);
        }
      });
      // outlets.push("total");
      const columns = ["ovo", "rekening", "selisih"];

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
              valueColumns[item] = convertToFloat(e[index]) || "";
            });
            data_outlet.push({
              nama_outlet: title,
              data: valueColumns,
            });
          });
          row["outlet"] = data_outlet;
          data.push(row);
        } else {
          i = lineHeader + 1;
        }
      });

      const array = [];
      data[0]["outlet"].forEach((e, i) => {
        array.push({
          id: i,
          nama_outlet: e["nama_outlet"] || "",
          data: [],
        });
      });
      data.forEach((e, i) => {
        e["outlet"].forEach((item, index) => {
          item["data"]["id"] = e["tanggal"];
          array[index]["data"].push(item["data"]);
        });
      });

      data = array;
    } else if (sheetName == "GOJEK & GRAB") {
      let outlets = [];
      spreadsheetData[5].forEach((e, i) => {
        if (i > 0 && e != null && e != "") {
          outlets.push(e);
        }
      });
      // outlets.push("total");
      const columns = [
        "gopay",
        "ovo",
        "uang_fisik",
        "nb",
        "total_suplyer",
        "setoran_bersih",
        "ppn",
        "koreksi",
        "total_uang_non_cash",
      ];

      const lineHeader = 6;
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
              if (item == "koreksi") {
                valueColumns[item] = e[index] || "";
              } else {
                valueColumns[item] = convertToFloat(e[index]) || "";
              }
            });
            data_outlet.push({
              nama_outlet: title,
              data: valueColumns,
            });
          });
          row["outlet"] = data_outlet;
          data.push(row);
        } else {
          i = lineHeader + 1;
        }
      });
      //       {
      //   id: 1,
      //   gopay: "275561.50",
      //   ovo: "0.00",
      //   uang_fisik: "1247434.00",
      //   nb: "0.00",
      //   total_suplyer: "576500.00",
      //   setoran_bersih: "224696.00",
      //   ppn: "74494.50",
      //   koreksi: "FALSE",
      //   total_uang_non_cash: "1247434.00",
      // },
      const array = [];
      data[0]["outlet"].forEach((e, i) => {
        array.push({
          id: i,
          nama_outlet: e["nama_outlet"] || "",
          data: [],
        });
      });
      data.forEach((e, i) => {
        e["outlet"].forEach((item, index) => {
          item["data"]["id"] = e["tanggal"];
          array[index]["data"].push(item["data"]);
        });
      });

      data = array;

      // return res.json(array);
    } else if (sheetName == "SALDO GORESTO") {
      const ketFirst = [
        "saldo_bulan_kemarin",
        "go_resto_all",
        "transfer_pihak",
        "sisa_saldo",
      ];
      const ketAll = ["go_resto_all", "transfer_pihak", "sisa_saldo"];
      const cols = ["debet", "kredit", "saldo"];

      const ChangeDate = (string) => {
        const array = string.split("/");
        if (array.length == 3) {
          return array[1];
        } else {
          return array[0].toLowerCase();
        }
      };

      for (let i = 1; i < spreadsheetData.length; ) {
        const e = spreadsheetData;
        const temp = {};
        temp["id"] = ChangeDate(e[i][0]);

        if (i == 1) {
          ketFirst.forEach((ket) => {
            let i_row = i;
            let i_col = 2;
            temp[ket] = {};
            cols.forEach((col) => {
              temp[ket][col] = convertToFloat(e[i_row][i_col]) || "0.0";
              i_col++;
            });
            i_row++;
          });
        } else if (temp["id"] == "total") {
          // let i_col = 2;
          // cols.forEach((col) => {
          //   temp[col] = convertToFloat(e[i][i_col]) || "0.0";
          //   i_col++;
          // });
        } else {
          ketAll.forEach((ket) => {
            let i_row = i;
            let i_col = 2;
            temp[ket] = {};
            cols.forEach((col) => {
              temp[ket][col] = convertToFloat(e[i_row][i_col]) || "0.0";
              i_col++;
            });
            i_row++;
          });
        }
        if (temp["id"] != "total") {
          data.push(temp);
        }

        if (i == 1) {
          i = i + 4;
        } else {
          i = i + 3;
        }
      }
    } else if (sheetName == "SALDO GRABRESTO") {
      const ketFirst = [
        "saldo_bulan_kemarin",
        "grab_ovo_all",
        "transfer_pihak",
        "sisa_saldo",
      ];
      const ketAll = ["grab_ovo_all", "transfer_pihak", "sisa_saldo"];
      const cols = ["debet", "kredit", "saldo"];

      const ChangeDate = (string) => {
        const array = string.split("/");
        if (array.length == 3) {
          return array[1];
        } else {
          return array[0].toLowerCase();
        }
      };

      for (let i = 1; i < spreadsheetData.length; ) {
        const e = spreadsheetData;
        const temp = {};
        temp["id"] = ChangeDate(e[i][0]);

        if (i == 1) {
          ketFirst.forEach((ket) => {
            let i_row = i;
            let i_col = 2;
            temp[ket] = {};
            cols.forEach((col) => {
              temp[ket][col] = convertToFloat(e[i_row][i_col]) || "0.0";
              i_col++;
            });
            i_row++;
          });
        } else if (temp["id"] == "total") {
          // let i_col = 2;
          // cols.forEach((col) => {
          //   temp[col] = convertToFloat(e[i][i_col]) || "0.0";
          //   i_col++;
          // });
        } else {
          ketAll.forEach((ket) => {
            let i_row = i;
            let i_col = 2;
            temp[ket] = {};
            cols.forEach((col) => {
              temp[ket][col] = convertToFloat(e[i_row][i_col]) || "0.0";
              i_col++;
            });
            i_row++;
          });
        }
        if (temp["id"] != "total") {
          data.push(temp);
        }

        if (i == 1) {
          i = i + 4;
        } else {
          i = i + 3;
        }
      }
    } else {
      return resSuccess(res, `Keuangan -> ${sheetName}`, null);
    }

    return resSuccess(res, `Keuangan -> ${sheetName}`, data);
  } catch (err) {
    return resError(res, err, 404);
  }
};
