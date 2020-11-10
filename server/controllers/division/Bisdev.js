const {
  resError,
  resSuccess
} = require("./../../helpers/HandleResponse");
const {
  Spreadsheet
} = require("./../../config/Spreadsheet");
const Joi = require("joi");

exports.Index = async (req, res, next) => {
  res.send("index bisdev");
};

exports.InvestorManagement = async (req, res, next) => {
  const dataset = {
    spreadsheet: "1rXNbhbMoIfMgj4ngn7TlDUTdMRjdDNJWVoZhmKONS-0",
    sheet: "DATA MITRA",
  };

  try {
    const spreadsheetData = await Spreadsheet(
      dataset.spreadsheet,
      dataset.sheet
    );

    const data = [];

    spreadsheetData.forEach((item, i) => {
      if (i > 6) {
        const result = {
          nama_mitra: item[0] || "",
          nik: item[1] || "",
          npwp: item[2] || "",
          alamat: item[3] || "",
          no_rekening: item[4] || "",
          an_rekening: item[5] || "",
          bank_rekening: item[6] || "",
        };

        data.push(result);
      }
    });

    return resSuccess(res, "Investor Management", data);
  } catch (err) {
    return resError(res, err, 404);
  }
};

exports.OutletProfiles = async (req, res, next) => {
  const dataset = {
    spreadsheet: "1Vh-GMekt7FxrlN8_06XRT7GMkzVg1xNJCrsjxiliUkQ",
    sheet: "DATA OUTLET",
  };

  try {
    const spreadsheetData = await Spreadsheet(
      dataset.spreadsheet,
      dataset.sheet
    );

    const data = [];

    spreadsheetData.forEach((item, i) => {
      if (i > 6) {
        const result = {
          keterangan: item[0] || "",
          nama_outlet: item[1] || "",
          brand: item[2] || "",
          regional: item[3] || "",
          status: item[4] || "",
          jenis: item[5] || "",
          aplikasi: item[6] || "",
          harga: item[7] || "",
          alamat: item[8] || "",
          nama_manager: item[9] || "",
          nama_mitra: item[10] || "",
          tanggal_grand_opening: item[11] || "",
          tanggal_terakhir_bayar: item[12] || "",
          tanggal_jatuh_tempo: item[13] || "",
          recheck: item[14] || "",
          rab_total: item[15] || "",
          harga_sewa_tuko_per_tahun: item[16] || "",
          biaya_lainnya: item[17] || "",
          share_profit_nelongso: item[18] || "",
          share_profit_mitra: item[19] || "",
          status_bep: item[20] || "",
        };

        data.push(result);
      }
    });

    return resSuccess(res, "Outlet Profiles", data);
  } catch (err) {
    return resError(res, err, 404);
  }
};