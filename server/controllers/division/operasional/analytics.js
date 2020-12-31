const { resError, resSuccess } = require("./../../../helpers/HandleResponse");
const { Spreadsheet } = require("./../../../config/Spreadsheet");
const Joi = require("joi");

const DataSet = {
  getSpreadsheets: [
    {
      year: 2020,
      spreadsheetId: "1yCMLBvSoz5t0p-EoC372LG9RKNICS5M6mgVmPHSosdE",
    },
  ],
  getSheetName: ["MASTER"],
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
    // _________________

    let data = [];
    let id = 1;
    spreadsheetData.forEach((e, i) => {
      let row = {
        id: `${id}`,
        bulan: titleKey(`${e[0] || ""}`),
        outlet: titleKey(`${e[1] || ""}`),
        regional: titleKey(`${e[2] || ""}`),
        omzet: {
          penjualan: convertToFloat(`${e[3] || "0.0"}`),
          ppn: convertToFloat(`${e[4] || "0.0"}`),
          gojek: convertToFloat(`${e[5] || "0.0"}`),
          grab: convertToFloat(`${e[6] || "0.0"}`),
          omset: convertToFloat(`${e[7] || "0.0"}`),
          target: convertToFloat(`${e[8] || "0.0"}`),
          persentate: convertToFloat(`${e[9] || "0.0"}`),
        },
        harga_pokok_penjualan: {
          harga_pokok_penjualan: convertToFloat(`${e[10] || "0.0"}`),
          persentase_hpp: convertToFloat(`${e[11] || "0.0"}`),
          target_hpp: convertToFloat(`${e[12] || "0.0"}`),
          pencapaian_hpp: convertToFloat(`${e[13] || "0.0"}`),
        },
        marketing: {
          beban_pemasaran: convertToFloat(`${e[14] || "0.0"}`),
          persentase_marketing: convertToFloat(`${e[15] || "0.0"}`),
          target_marketing: convertToFloat(`${e[16] || "0.0"}`),
          pencapaian_marketing: convertToFloat(`${e[17] || "0.0"}`),
        },
        beban_gaji: {
          beban_gaji: convertToFloat(`${e[18] || "0.0"}`),
          persentase_gaji: convertToFloat(`${e[19] || "0.0"}`),
          target_gaji: convertToFloat(`${e[20] || "0.0"}`),
          pencapaian_gaji: convertToFloat(`${e[21] || "0.0"}`),
        },
        total_operasional_produksi: {
          bensin: convertToFloat(`${e[22] || "0.0"}`),
          listrik: convertToFloat(`${e[23] || "0.0"}`),
          pdam: convertToFloat(`${e[24] || "0.0"}`),
          wifi: convertToFloat(`${e[25] || "0.0"}`),
          sedot_limbah: convertToFloat(`${e[26] || "0.0"}`),
          sewa_mess: convertToFloat(`${e[27] || "0.0"}`),
          atk: convertToFloat(`${e[28] || "0.0"}`),
          peralatan: convertToFloat(`${e[29] || "0.0"}`),
          perlengkapan: convertToFloat(`${e[30] || "0.0"}`),
          pemeliharaan_kendaraan: convertToFloat(`${e[31] || "0.0"}`),
          sewa_lahan_parkir: convertToFloat(`${e[32] || "0.0"}`),
          konsumsi_karyawan: convertToFloat(`${e[33] || "0.0"}`),
          laundry: convertToFloat(`${e[34] || "0.0"}`),
          iuran_warga: convertToFloat(`${e[35] || "0.0"}`),
          sampah: convertToFloat(`${e[36] || "0.0"}`),
          sewa_ruko: convertToFloat(`${e[37] || "0.0"}`),
          rnd: convertToFloat(`${e[38] || "0.0"}`),
          perbaikan_outlet: convertToFloat(`${e[39] || "0.0"}`),
          biaya_lain_lain: convertToFloat(`${e[40] || "0.0"}`),
          lain_lain: convertToFloat(`${e[41] || "0.0"}`),
          total_operasional_produksi: convertToFloat(`${e[42] || "0.0"}`),
          persentase_operasional_produksi: convertToFloat(`${e[43] || "0.0"}`),
          target_operasional_produksi: convertToFloat(`${e[44] || "0.0"}`),
          pencapaian_operasional_produksi: convertToFloat(`${e[45] || "0.0"}`),
        },
        total_non_operasional_produksi: {
          pph: convertToFloat(`${e[46] || "0.0"}`),
          sedekah: convertToFloat(`${e[47] || "0.0"}`),
          bpjs: convertToFloat(`${e[48] || "0.0"}`),
          perawatan_program: convertToFloat(`${e[49] || "0.0"}`),
          reklame: convertToFloat(`${e[50] || "0.0"}`),
          reward: convertToFloat(`${e[51] || "0.0"}`),
          pbb: convertToFloat(`${e[52] || "0.0"}`),
          admin_bank: convertToFloat(`${e[53] || "0.0"}`),
          lain_lain: convertToFloat(`${e[54] || "0.0"}`),
          total_non_operasional_produksi: convertToFloat(`${e[55] || "0.0"}`),
          persentase_non_operasional_produksi: convertToFloat(
            `${e[56] || "0.0"}`
          ),
          target_non_operasional_produksi: convertToFloat(`${e[57] || "0.0"}`),
          pencapaian_non_operasional_produksi: convertToFloat(
            `${e[58] || "0.0"}`
          ),
        },
      };
      if (i > 7) {
        data.push(row);
        id++;
      }
    });

    return resSuccess(res, `Operasional -> ${sheetName}`, data);
  } catch (err) {
    return resError(res, err, 200);
  }
};
