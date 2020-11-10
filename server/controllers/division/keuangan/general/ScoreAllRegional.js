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

    const newSpreadsheetData = spreadsheetData.map((e) => e.slice(1));

    let data = [];

    const titleKey = (text) => {
      const string = `${text}`;
      const filter1 = string.substring(0, 1).replace(" ", "");
      const filter2 = string.substring(1);
      const titleText = filter1 + filter2;
      return titleText.replace(/ /g, "_").toLowerCase();
    };

    if (sheetName == "DATA") {
      const lineHeader = 4;
      newSpreadsheetData.forEach((e, i) => {
        if (i > lineHeader) {
          let row = {};
          newSpreadsheetData[5].forEach((child, index) => {
            const title = titleKey(child);
            row[title] = e[index] || "";
          });

          data.push(row);
        } else {
          i = lineHeader + 1;
        }
      });
    } else if (sheetName == "SHARE PROFIT & BEP") {
      const lineHeader = 4;
      newSpreadsheetData.forEach((e, i) => {
        if (i > lineHeader) {
          const row = {
            outlet: e[0] || "",
            share_profit: {
              nelongso: e[1] || "",
              persentase_nelongso: e[2] || "",
              mitra: e[3] || "",
              persentase_mitra: e[4] || "",
            },
            bep: {
              nelongso: e[5] || "",
              persentase_nelongso: e[6] || "",
              mitra: e[7] || "",
              persentase_mitra: e[8] || "",
            },
            keterangan: e[9] || "",
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
      spreadsheetData.forEach((e, i) => {
        if (i > 5) {
          const row = {
            no: e[0] || "",
            outlet: e[1] || "",
            regional: e[2] || "",
            omzet: {
              penjualan: e[3] || "",
              ppn: e[4] || "",
              gojek: e[5] || "",
              grab: e[6] || "",
              omset: e[7] || "",
              target: e[8] || "",
              persentase: e[9] || "",
            },
            harga_pokok_penjualan: {
              harga_pokok_penjualan: e[10] || "",
              hpp: e[11] || "",
              target_hpp: e[12] || "",
              pencapaian_hpp: e[13] || "",
            },
            total_operasional_produksi: {
              bensin: e[14] || "",
              listrik: e[15] || "",
              pdam: e[16] || "",
              wifi: e[17] || "",
              sedotan_limbah: e[18] || "",
              sewa_mess: e[19] || "",
              atk: e[20] || "",
              peralatan: e[21] || "",
              perlengkapan: e[22] || "",
              pemeliharaan_kendaraan_and_peralatan: e[23] || "",
              sewa_lahan_parkir: e[24] || "",
              konsumsi_karyawan: e[25] || "",
              laundry: e[26] || "",
              iuran_warga: e[27] || "",
              sampah: e[28] || "",
              sewa_ruko: e[29] || "",
              rnd: e[30] || "",
              perbaikan_outlet: e[31] || "",
              biaya_lain_lain: e[32] || "",
              total_operasional_produksi: e[33] || "",
              persentase_operasional_produksi: e[34] || "",
              target_operasional_produksi: e[35] || "",
              pecapaian_operasional_produksi: e[36] || "",
            },
            operasional_non_produksi: {
              pph: e[37] || "",
              sedekah: e[38] || "",
              bpjs: e[39] || "",
              perawatan_program: e[40] || "",
              beklame: e[41] || "",
              reward: e[42] || "",
              pbb: e[43] || "",
              admin_bank: e[44] || "",
              total_operasional_non_produksi: e[45] || "",
              persentase_operasional_non_produksi: e[46] || "",
              target_operasional_non_produksi: e[47] || "",
              pecapaian_operasional_non_produksi: e[48] || "",
            },
            promo_marketing: e[49] || "",
            gross_profit: e[50] || "",
            beban_gaji: {
              beban_gaji: e[51] || "",
              gaji: e[52] || "",
              target_gaji: e[53] || "",
              pecapaian_gaji: e[54] || "",
            },
            net_profit: {
              net_profit: e[55] || "",
              persentase_net_profit: e[56] || "",
              target_net_profit: e[57] || "",
              pencapaian_net_profit: e[58] || "",
            },
            pic: e[59] || "",
          };

          data.push(row);
        }
      });
    } else if (sheetName == "BIAYA TAMBAHAN") {
      spreadsheetData.forEach((e, i) => {
        if (i > 5) {
          const row = {
            no: e[0] || "",
            outlet: e[1] || "",
            regional: e[2] || "",
            total_operasional_produksi: {
              bensin: e[3] || "",
              listrik: e[4] || "",
              pdam: e[5] || "",
              wifi: e[6] || "",
              sedotan_limbah: e[7] || "",
              sewa_mess: e[8] || "",
              atk: e[9] || "",
              peralatan: e[10] || "",
              perlengkapan: e[11] || "",
              pemeliharaan_kendaraan_and_peralatan: e[12] || "",
              sewa_lahan_parkir: e[13] || "",
              konsumsi_karyawan: e[14] || "",
              laundry: e[15] || "",
              iuran_warga: e[16] || "",
              sampah: e[17] || "",
              sewa_ruko: e[18] || "",
              rnd: e[19] || "",
              perbaikan_outlet: e[20] || "",
              biaya_lain_lain: e[21] || "",
            },
            total_operasional_non_produksi: {
              pph: e[22] || "",
              sedekah: e[23] || "",
              bpjs: e[24] || "",
              perawatan_program: e[25] || "",
              reklame: e[26] || "",
              reward: e[27] || "",
              pbb: e[28] || "",
              admin_bank: e[29] || "",
              lain_lain: e[30] || "",
            },
          };

          data.push(row);
        }
      });
    } else if (sheetName == "FINAL") {
      spreadsheetData.forEach((e, i) => {
        if (i > 5) {
          const result = {
            // no: e[0] || "",
            outlet: e[0] || "",
            regional: e[1] || "",
            omzet: {
              penjualan: e[2] || "",
              ppn: e[3] || "",
              gojek: e[4] || "",
              grab: e[5] || "",
              omset: e[6] || "",
              targe: e[7] || "",
              persentase: e[8] || "",
            },
            harga_pokok_penjualan: {
              harga_pokok_penjualan: e[9] || "",
              persentase_hpp: e[10] || "",
              target_hpp: e[11] || "",
              pencapaian_hpp: e[12] || "",
            },
            marketing: {
              beban_pemasaran_and_iklan: e[13] || "",
              persentase_marketing: e[14] || "",
              target_marketing: e[15] || "",
              pencapaian_marketing: e[16] || "",
            },
            beban_gaji: {
              beban_gaji: e[17] || "",
              persentase_gaji: e[18] || "",
              target_gaji: e[19] || "",
              pencapaian_gaji: e[20] || "",
            },
            total_operasional_produksi: {
              bensin: e[21] || "",
              listrik: e[22] || "",
              pdam: e[23] || "",
              wifi: e[24] || "",
              sedotan_limbah: e[25] || "",
              sewa_mess: e[26] || "",
              atk: e[27] || "",
              peralatan: e[28] || "",
              perlengkapan: e[29] || "",
              pemeliharaan_kendaraan_and_peralatan: e[30] || "",
              sewa_lahan_parkir: e[31] || "",
              konsumsi_karyawan: e[32] || "",
              laundry: e[33] || "",
              iuran_warga: e[34] || "",
              sampah: e[35] || "",
              sewa_ruko: e[36] || "",
              rnd: e[37] || "",
              perbaikan_outlet: e[38] || "",
              biaya_lain_lain: e[39] || "",
              lain_lain: e[40] || "",
              total_operasional_produksi: e[41] || "",
              persentase_operasional_produksi: e[42] || "",
              target_operasional_produksi: e[43] || "",
              pencapaian_operasional: e[44] || "",
            },
            total_operasional_non_produksi: {
              pph: e[45] || "",
              sedekah: e[46] || "",
              bpjs: e[47] || "",
              perawatan_program: e[48] || "",
              reklame: e[49] || "",
              reward: e[50] || "",
              pbb: e[51] || "",
              admin_bank: e[52] || "",
              lain_lain: e[53] || "",
              total_operasional_non_produksi: e[54] || "",
              persentase_operasional_non_produksi: e[55] || "",
              target_operasional_non_produksi: e[56] || "",
              pencapaian_non_operasional: e[57] || "",
            },
            net_profit: {
              net_profit: e[58] || "",
              persentase_net_profit: e[59] || "",
              target_net_profit: e[60] || "",
              pencapaian_net_profit: e[61] || "",
            },
            share_profit: {
              nelongso: e[62] || "",
              mitra: e[63] || "",
            },
          };

          data.push(result);
        }
      });
    } else if (sheetName == "PPH") {
      spreadsheetData.forEach((e, i) => {
        if (i > 6) {
          const result = {
            // no: item[0] || "",
            outlet: e[0] || "",
            bulan_sebelum: {
              net_profit: e[1] || "",
              persentase: e[2] || "",
              pph: e[3] || "",
            },
            bulan_sekarang: {
              net_profit: e[4] || "",
              persentase: e[5] || "",
              pph: e[6] || "",
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
