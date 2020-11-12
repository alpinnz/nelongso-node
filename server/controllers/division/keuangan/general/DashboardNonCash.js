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

    if (sheetName == "GORESTO") {
      let outlets = [];
      spreadsheetData[4].forEach((e, i) => {
        if (i > 0 && e != null && e != "") {
          outlets.push(e);
        }
      });
      outlets.push("total");
      const columns = ["grab", "rekening", "selisih"];

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
    } else if (sheetName == "GRABRESTO") {
      let outlets = [];
      spreadsheetData[4].forEach((e, i) => {
        if (i > 0 && e != null && e != "") {
          outlets.push(e);
        }
      });
      outlets.push("total");
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
              valueColumns[item] = e[index] || "";
            });
            data_outlet.push({
              nama_outlet: title,
              data: valueColumns,
            });
          });
          //   row["outlet"] = ;
          data.push(data_outlet);
        } else {
          i = lineHeader + 1;
        }
      });
    } else if (sheetName == "GOJEK & GRAB") {
      let outlets = [];
      spreadsheetData[5].forEach((e, i) => {
        if (i > 0 && e != null && e != "") {
          outlets.push(e);
        }
      });
      outlets.push("total");
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
              valueColumns[item] = e[index] || "";
            });
            data_outlet.push({
              nama_outlet: title,
              data: valueColumns,
            });
          });
          //   row["outlet"] = ;
          data.push(data_outlet);
        } else {
          i = lineHeader + 1;
        }
      });
    } else if (sheetName == "SALDO GORESTO") {
      let row = {};
      let i_row = 0;
      let net_i_row = 4;

      let ket_col = {};

      let i_ket = 0;
      const ket = [
        "sisal_saldo_bulan",
        "go_resto_all",
        "transfer_pihak",
        "sisa_saldo",
      ];
      const columns = ["debet", "kredit", "saldo"];
      spreadsheetData.forEach((e) => {
        const req_col = 5;
        if (e.length <= req_col) {
          const net_col = e.length - req_col;
          for (let index = 0; index < net_col; index++) {
            e.push("");
          }
        }
        for (let i = 0; i < e.length; i++) {
          if (i_row == 0 && i == 0) {
            row["tanggal"] = e[i];
          }
          if (i == 2) {
            let cols = {};
            columns.forEach((column) => {
              cols[column] = e[i] || "";
              i++;
            });
            ket_col[ket[i_ket]] = cols;
            i_ket++;
          }
        }
        if (i_row == net_i_row - 1) {
          row["keterangan"] = ket_col;
          data.push(row);
          i_row = 0;
          i_ket = 0;
        } else {
          i_row++;
        }
      });
    } else if (sheetName == "SALDO GRABRESTO") {
      let row = {};
      let i_row = 0;
      let net_i_row = 4;

      let ket_col = {};

      let i_ket = 0;
      const ket = [
        "sisal_saldo_bulan",
        "go_resto_all",
        "transfer_pihak",
        "sisa_saldo",
      ];
      const columns = ["debet", "kredit", "saldo"];
      spreadsheetData.forEach((e) => {
        const req_col = 5;
        if (e.length <= req_col) {
          const net_col = e.length - req_col;
          for (let index = 0; index < net_col; index++) {
            e.push("");
          }
        }
        for (let i = 0; i < e.length; i++) {
          if (i_row == 0 && i == 0) {
            row["tanggal"] = e[i];
          }
          if (i == 2) {
            let cols = {};
            columns.forEach((column) => {
              cols[column] = e[i] || "";
              i++;
            });
            ket_col[ket[i_ket]] = cols;
            i_ket++;
            console.log(cols);
            console.log(ket_col);
          }
        }
        if (i_row == net_i_row - 1) {
          row["keterangan"] = ket_col;
          data.push(row);
          i_row = 0;
          i_ket = 0;
        } else {
          i_row++;
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
