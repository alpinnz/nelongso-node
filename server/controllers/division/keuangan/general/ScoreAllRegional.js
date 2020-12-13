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
          name: "januari",
          spreadsheetId: "1_ZWArIxpTX9qmr3aRifqsBuSBVbE5dRBED2lxxapBKI",
        },
        {
          id: 2,
          name: "febuari",
          spreadsheetId: "1X6SV6puAfOc4gSTbFdP37lT-b-BUj5HklZKCKqQHkUU",
        },
        {
          id: 3,
          name: "maret",
          spreadsheetId: "1ahSj9wFohIDLE-UIcR8yejZuLLZvn3UOuYSrnV_hMcE",
        },
        {
          id: 4,
          name: "april",
          spreadsheetId: "11Uxxe9MlZsWMSbg06LDEjUzmyyM2JAz34oZ7WxhkN6Q",
        },
        {
          id: 5,
          name: "mei",
          spreadsheetId: "14tv58jXoKj0_FqCejSzD9UHsMQLfP3Nxpfe_7T-MsOs",
        },
        {
          id: 6,
          name: "juni",
          spreadsheetId: "1VSuZ7ksi6OVOlUQAvWMowuTftwXuUngIlhEOdI2moSA",
        },
        {
          id: 7,
          name: "juli",
          spreadsheetId: "1LkHOTVGdKZ3hItFDTZA99xCBDWaVX7mmAnmduZDq7Vc",
        },
        {
          id: 8,
          name: "agustus",
          spreadsheetId: "1Urmdr4OYFNlmbl3Uvwr8cIGCio52YHrA3oXW3wcoxt0",
        },
        {
          id: 9,
          name: "september",
          spreadsheetId: "1v0jGeWbtNMzg3zAnNaSdAk4Ma9rr2IY8R6GdzRMTkfQ",
        },
        {
          id: 10,
          name: "oktober",
          spreadsheetId: "1d2CgVwSgcoZp4-6oouVzueF22aEk8ifOYJQ8OYTYE1E",
        },
        {
          id: 11,
          name: "november",
          spreadsheetId: "12M1haunCn5SveuXFrZZqAH3t_oSG77wqmxP1Mf6fGIA",
        },
        {
          id: 12,
          name: "desember",
          spreadsheetId: "1GuSxkolGQfM36RPZpqPZPoJhWARCpIrQa5z-Jvo4Fq4",
        },
      ],
    },
  ],
  getSheetName: [
    "DATA",
    "SHARE PROFIT & BEP",
    "MINGGU 1",
    "MINGGU 2",
    "MINGGU 3",
    "MINGGU 4",
    "MINGGU 5",
    "BIAYA TAMBAHAN",
    "FINAL",
    "PPH",
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

    const newSpreadsheetData = spreadsheetData.map((e) => e.slice(1));

    let data = [];

    if (sheetName == "DATA") {
      let no = 1;
      const lineHeader = 5;
      newSpreadsheetData.forEach((e, i) => {
        if (i > lineHeader) {
          let row = {
            no: `${no++}`,
            outlet: titleKey(e[0]) || "",
            regional: titleKey(e[1]) || "",
            nama_mitra: e[2] || "",
            bank: e[3] || "",
            no_rek: e[4] || "",
            an_rek: e[5] || "",
            pic: e[6] || "",
            ppn: e[7] || "",
          };

          data.push(row);
        } else {
          i = lineHeader + 1;
        }
      });
    } else if (sheetName == "SHARE PROFIT & BEP") {
      const lineHeader = 5;
      newSpreadsheetData.forEach((e, i) => {
        if (i > lineHeader) {
          const row = {
            outlet: titleKey(e[0]) || "",
            share_profit: {
              nelongso: convertToFloat(e[1]) || "0.0",
              persentase_nelongso: convertToFloat(e[2]) || "0.0",
              mitra: convertToFloat(e[3]) || "0.0",
              persentase_mitra: convertToFloat(e[4]) || "0.0",
            },
            bep: {
              nelongso: convertToFloat(e[5]) || "0.0",
              persentase_nelongso: convertToFloat(e[6]) || "0.0",
              mitra: convertToFloat(e[7]) || "0.0",
              persentase_mitra: convertToFloat(e[8]) || "0.0",
            },
            keterangan: titleKey(e[9]) || "",
          };

          data.push(row);
        } else {
          i = lineHeader + 1;
        }
      });
    } else if (
      sheetName == "MINGGU 1" ||
      sheetName == "MINGGU 2" ||
      sheetName == "MINGGU 3" ||
      sheetName == "MINGGU 4" ||
      sheetName == "MINGGU 5"
    ) {
      let no = 0;

      spreadsheetData.forEach((e, i) => {
        if (i > 5) {
          no++;
          const row = {
            no: e[0] || `${no}`,
            outlet: titleKey(e[1]) || "",
            regional: titleKey(e[2]) || "",
            omzet: {
              penjualan: convertToFloat(e[3]) || "0.0",
              ppn: convertToFloat(e[4]) || "0.0",
              gojek: convertToFloat(e[5]) || "0.0",
              grab: convertToFloat(e[6]) || "0.0",
              omset: convertToFloat(e[7]) || "0.0",
              target: convertToFloat(e[8]) || "0.0",
              persentase: convertToFloat(e[9]) || "0.0",
            },
            harga_pokok_penjualan: {
              harga_pokok_penjualan: convertToFloat(e[10]) || "0.0",
              hpp: convertToFloat(e[11]) || "0.0",
              target_hpp: convertToFloat(e[12]) || "0.0",
              pencapaian_hpp: convertToFloat(e[13]) || "0.0",
            },
            total_operasional_produksi: {
              bensin: convertToFloat(e[14]) || "0.0",
              listrik: convertToFloat(e[15]) || "0.0",
              pdam: convertToFloat(e[16]) || "0.0",
              wifi: convertToFloat(e[17]) || "0.0",
              sedotan_limbah: convertToFloat(e[18]) || "0.0",
              sewa_mess: convertToFloat(e[19]) || "0.0",
              atk: convertToFloat(e[20]) || "0.0",
              peralatan: convertToFloat(e[21]) || "0.0",
              perlengkapan: convertToFloat(e[22]) || "0.0",
              pemeliharaan_kendaraan_and_peralatan:
                convertToFloat(e[23]) || "0.0",
              sewa_lahan_parkir: convertToFloat(e[24]) || "0.0",
              konsumsi_karyawan: convertToFloat(e[25]) || "0.0",
              laundry: convertToFloat(e[26]) || "0.0",
              iuran_warga: convertToFloat(e[27]) || "0.0",
              sampah: convertToFloat(e[28]) || "0.0",
              sewa_ruko: convertToFloat(e[29]) || "0.0",
              rnd: convertToFloat(e[30]) || "0.0",
              perbaikan_outlet: convertToFloat(e[31]) || "0.0",
              biaya_lain_lain: convertToFloat(e[32]) || "0.0",
              total_operasional_produksi: convertToFloat(e[33]) || "0.0",
              persentase_operasional_produksi: convertToFloat(e[34]) || "0.0",
              target_operasional_produksi: convertToFloat(e[35]) || "0.0",
              pecapaian_operasional_produksi: convertToFloat(e[36]) || "0.0",
            },
            operasional_non_produksi: {
              pph: convertToFloat(e[37]) || "0.0",
              sedekah: convertToFloat(e[38]) || "0.0",
              bpjs: convertToFloat(e[39]) || "0.0",
              perawatan_program: convertToFloat(e[40]) || "0.0",
              beklame: convertToFloat(e[41]) || "0.0",
              reward: convertToFloat(e[42]) || "0.0",
              pbb: convertToFloat(e[43]) || "0.0",
              admin_bank: convertToFloat(e[44]) || "0.0",
              total_operasional_non_produksi: convertToFloat(e[45]) || "0.0",
              persentase_operasional_non_produksi:
                convertToFloat(e[46]) || "0.0",
              target_operasional_non_produksi: convertToFloat(e[47]) || "0.0",
              pecapaian_operasional_non_produksi:
                convertToFloat(e[48]) || "0.0",
            },
            promo_marketing: convertToFloat(e[49]) || "0.0",
            gross_profit: convertToFloat(e[50]) || "0.0",
            beban_gaji: {
              beban_gaji: convertToFloat(e[51]) || "0.0",
              gaji: convertToFloat(e[52]) || "0.0",
              target_gaji: convertToFloat(e[53]) || "0.0",
              pecapaian_gaji: convertToFloat(e[54]) || "0.0",
            },
            net_profit: {
              net_profit: convertToFloat(e[55]) || "0.0",
              persentase_net_profit: convertToFloat(e[56]) || "0.0",
              target_net_profit: convertToFloat(e[57]) || "0.0",
              pencapaian_net_profit: convertToFloat(e[58]) || "0.0",
            },
            pic: e[59] || "",
          };
          data.push(row);
        }
      });
    } else if (sheetName == "BIAYA TAMBAHAN") {
      let no = 0;
      spreadsheetData.forEach((e, i) => {
        if (i > 5) {
          no++;
          const row = {
            no: e[0] || `${no}`,
            outlet: titleKey(e[1]) || "",
            regional: titleKey(e[2]) || "",
            total_operasional_produksi: {
              bensin: convertToFloat(e[3]) || "0.0",
              listrik: convertToFloat(e[4]) || "0.0",
              pdam: convertToFloat(e[5]) || "0.0",
              wifi: convertToFloat(e[6]) || "0.0",
              sedotan_limbah: convertToFloat(e[7]) || "0.0",
              sewa_mess: convertToFloat(e[8]) || "0.0",
              atk: convertToFloat(e[9]) || "0.0",
              peralatan: convertToFloat(e[10]) || "0.0",
              perlengkapan: convertToFloat(e[11]) || "0.0",
              pemeliharaan_kendaraan_and_peralatan:
                convertToFloat(e[12]) || "0.0",
              sewa_lahan_parkir: convertToFloat(e[13]) || "0.0",
              konsumsi_karyawan: convertToFloat(e[14]) || "0.0",
              laundry: convertToFloat(e[15]) || "0.0",
              iuran_warga: convertToFloat(e[16]) || "0.0",
              sampah: convertToFloat(e[17]) || "0.0",
              sewa_ruko: convertToFloat(e[18]) || "0.0",
              rnd: convertToFloat(e[19]) || "0.0",
              perbaikan_outlet: convertToFloat(e[20]) || "0.0",
              biaya_lain_lain: convertToFloat(e[21]) || "0.0",
            },
            total_operasional_non_produksi: {
              pph: convertToFloat(e[22]) || "0.0",
              sedekah: convertToFloat(e[23]) || "0.0",
              bpjs: convertToFloat(e[24]) || "0.0",
              perawatan_program: convertToFloat(e[25]) || "0.0",
              reklame: convertToFloat(e[26]) || "0.0",
              reward: convertToFloat(e[27]) || "0.0",
              pbb: convertToFloat(e[28]) || "0.0",
              admin_bank: convertToFloat(e[29]) || "0.0",
              lain_lain: convertToFloat(e[30]) || "0.0",
            },
          };

          data.push(row);
        }
      });
    } else if (sheetName == "FINAL") {
      let no = 0;
      spreadsheetData.forEach((e, i) => {
        if (i > 5) {
          no++;
          const result = {
            no: `${no}`,
            outlet: titleKey(e[0]) || "",
            regional: titleKey(e[1]) || "",
            omzet: {
              penjualan: convertToFloat(e[2]) || "0.0",
              ppn: convertToFloat(e[3]) || "0.0",
              gojek: convertToFloat(e[4]) || "0.0",
              grab: convertToFloat(e[5]) || "0.0",
              omset: convertToFloat(e[6]) || "0.0",
              targe: convertToFloat(e[7]) || "0.0",
              persentase: convertToFloat(e[8]) || "0.0",
            },
            harga_pokok_penjualan: {
              harga_pokok_penjualan: convertToFloat(e[9]) || "0.0",
              persentase_hpp: convertToFloat(e[10]) || "0.0",
              target_hpp: convertToFloat(e[11]) || "0.0",
              pencapaian_hpp: convertToFloat(e[12]) || "0.0",
            },
            marketing: {
              beban_pemasaran_and_iklan: convertToFloat(e[13]) || "0.0",
              persentase_marketing: convertToFloat(e[14]) || "0.0",
              target_marketing: convertToFloat(e[15]) || "0.0",
              pencapaian_marketing: convertToFloat(e[16]) || "0.0",
            },
            beban_gaji: {
              beban_gaji: convertToFloat(e[17]) || "0.0",
              persentase_gaji: convertToFloat(e[18]) || "0.0",
              target_gaji: convertToFloat(e[19]) || "0.0",
              pencapaian_gaji: convertToFloat(e[20]) || "0.0",
            },
            total_operasional_produksi: {
              bensin: convertToFloat(e[21]) || "0.0",
              listrik: convertToFloat(e[22]) || "0.0",
              pdam: convertToFloat(e[23]) || "0.0",
              wifi: convertToFloat(e[24]) || "0.0",
              sedotan_limbah: convertToFloat(e[25]) || "0.0",
              sewa_mess: convertToFloat(e[26]) || "0.0",
              atk: convertToFloat(e[27]) || "0.0",
              peralatan: convertToFloat(e[28]) || "0.0",
              perlengkapan: convertToFloat(e[29]) || "0.0",
              pemeliharaan_kendaraan_and_peralatan:
                convertToFloat(e[30]) || "0.0",
              sewa_lahan_parkir: convertToFloat(e[31]) || "0.0",
              konsumsi_karyawan: convertToFloat(e[32]) || "0.0",
              laundry: convertToFloat(e[33]) || "0.0",
              iuran_warga: convertToFloat(e[34]) || "0.0",
              sampah: convertToFloat(e[35]) || "0.0",
              sewa_ruko: convertToFloat(e[36]) || "0.0",
              rnd: convertToFloat(e[37]) || "0.0",
              perbaikan_outlet: convertToFloat(e[38]) || "0.0",
              biaya_lain_lain: convertToFloat(e[39]) || "0.0",
              lain_lain: convertToFloat(e[40]) || "0.0",
              total_operasional_produksi: convertToFloat(e[41]) || "0.0",
              persentase_operasional_produksi: convertToFloat(e[42]) || "0.0",
              target_operasional_produksi: convertToFloat(e[43]) || "0.0",
              pencapaian_operasional: convertToFloat(e[44]) || "0.0",
            },
            total_operasional_non_produksi: {
              pph: convertToFloat(e[45]) || "0.0",
              sedekah: convertToFloat(e[46]) || "0.0",
              bpjs: convertToFloat(e[47]) || "0.0",
              perawatan_program: convertToFloat(e[48]) || "0.0",
              reklame: convertToFloat(e[49]) || "0.0",
              reward: convertToFloat(e[50]) || "0.0",
              pbb: convertToFloat(e[51]) || "0.0",
              admin_bank: convertToFloat(e[52]) || "0.0",
              lain_lain: convertToFloat(e[53]) || "0.0",
              total_operasional_non_produksi: convertToFloat(e[54]) || "0.0",
              persentase_operasional_non_produksi:
                convertToFloat(e[55]) || "0.0",
              target_operasional_non_produksi: convertToFloat(e[56]) || "0.0",
              pencapaian_non_operasional: convertToFloat(e[57]) || "0.0",
            },
            net_profit: {
              net_profit: convertToFloat(e[58]) || "0.0",
              persentase_net_profit: convertToFloat(e[59]) || "0.0",
              target_net_profit: convertToFloat(e[60]) || "0.0",
              pencapaian_net_profit: convertToFloat(e[61]) || "0.0",
            },
            share_profit: {
              nelongso: convertToFloat(e[62]) || "0.0",
              mitra: convertToFloat(e[63]) || "0.0",
            },
          };

          data.push(result);
        }
      });
    } else if (sheetName == "PPH") {
      let no = 1;
      spreadsheetData.forEach((e, i) => {
        if (i > 6) {
          const result = {
            no: `${no++}`,
            outlet: titleKey(e[0]) || "",
            bulan_sebelum: {
              net_profit: convertToFloat(e[1]) || "0.0",
              persentase: convertToFloat(e[2]) || "0.0",
              pph: convertToFloat(e[3]) || "0.0",
            },
            bulan_sekarang: {
              net_profit: convertToFloat(e[4]) || "0.0",
              persentase: convertToFloat(e[5]) || "0.0",
              pph: convertToFloat(e[6]) || "0.0",
            },
          };

          data.push(result);
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
