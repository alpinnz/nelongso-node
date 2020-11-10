const {
  resError,
  resSuccess
} = require("./../../helpers/HandleResponse");
const {
  Spreadsheet
} = require("./../../config/Spreadsheet");
const DashboardNonCashAllRegional = require("./../../services/Keuangan/General/DashboardNonCashAllRegional");
const DashboardKeuanganRegional = require("./../../services/Keuangan/General/DashboardKeuanganRegional");
const Joi = require("joi");

exports.Index = async (req, res) => {
  res.send("index keuangan");
};

exports.GeneralDashboardKeuanganRegional = async (req, res) => {
  const schema = Joi.object({
    Date: Joi.object({
      year: Joi.number().min(2020).max(2025).required(),
      month: Joi.number().min(1).max(12).required(),
    }).required(),
    Sheet: Joi.object({
      name: Joi.string().required(),
    }).required(),
    Regional: Joi.object({
      name: Joi.string().required(),
    }).required(),
  });

  const {
    error,
    value
  } = schema.validate(req.body);
  if (error) {
    return resError(res, error.details[0].message, 404);
  }
  const {
    Date,
    Sheet,
    Regional
  } = value;

  try {
    const dataset = {
      year: [{
        id: 2020,
        month: [{
          id: 10,
          regional: [{
              id: "jabar",
              spreadsheetId: "1hhrab5TEAqouaJlMGXKsGTMseKah5UB3jEboRe188Hg",
            },
            {
              id: "jatim1",
              spreadsheetId: "1_Uacdi1XWB7NyIy7RcNCIVuqgzWF4tPyWy4HlZD9EJM",
            },
            {
              id: "jatim2",
              spreadsheetId: "1nlg2RB1y96pzvlGPfiFMOJTGdLmySEPK-F2ndShKBI0",
            },
            {
              id: "jatim3",
              spreadsheetId: "1ks-n3CsNo0lfxc9wKiE_-72CEMjuAYFqjieK7DsXldE",
            },
          ],
        }, ],
      }, ],
      sheet: [
        "REKAP OUTLET BULANAN",
        "REKAP HPP SUPPLIER",
        "REKAP OMZET OFFLINE & ONLINE",
        "REKAP KUNJUNGAN",
        "PERSENTASE KUNJUNGAN",
        "REKAP OPERASIONAL",
        "REKAP OMZET PER SHIFT",
        "REKAP MENU YANG TERJUAL"
      ],
    };

    const dataYear = dataset.year.find((e) => e.id == Date.year);
    if (!dataYear) return resError(res, `${Date.year} not found`, 404);
    const dataMonth = dataYear.month.find((e) => e.id == Date.month);
    if (!dataMonth) return resError(res, `${Date.month} not found`, 404);
    const dataRegional = dataMonth.regional.find((e) => e.id == Regional.name);
    if (!dataRegional) return resError(res, `${Regional.name} not found`, 404);
    const sheetName = dataset.sheet.find((e) => e == Sheet.name);
    const sheetAll = dataset.sheet.join(' ,')
    if (!sheetName) return resError(res, `${Sheet.name} not found ,available : ${sheetAll}`, 404);

    const {
      spreadsheetId
    } = dataRegional;
    // REKAP OMZET PER SHIFT
    const spreadsheetData = await Spreadsheet(spreadsheetId, sheetName);

    if (sheetName == "REKAP OUTLET BULANAN") {
      const data = await DashboardKeuanganRegional.RekapOutletBulanan(
        spreadsheetData,
        dataRegional.id
      );
      return resSuccess(
        res,
        `GeneralScoreBoardAllRegional -> ${sheetName}`,
        data
      );
    } else if (sheetName == "REKAP HPP SUPPLIER") {
      const data = await DashboardKeuanganRegional.RekapHPPBahanBaku(
        spreadsheetData,
        dataRegional.id
      );
      return resSuccess(
        res,
        `GeneralScoreBoardAllRegional -> ${sheetName}`,
        data
      );
      //
    } else if (sheetName == "REKAP OMZET OFFLINE & ONLINE") {
      const data = await DashboardKeuanganRegional.RekapOmzetOfflineAndOnline(
        spreadsheetData,
        dataRegional.id
      );
      return resSuccess(
        res,
        `GeneralScoreBoardAllRegional -> ${sheetName}`,
        data
      );
    } else if (sheetName == "REKAP KUNJUNGAN") {
      const data = await DashboardKeuanganRegional.RekapKunjungan(
        spreadsheetData,
        dataRegional.id
      );
      return resSuccess(
        res,
        `GeneralScoreBoardAllRegional -> ${sheetName}`,
        data
      );
    } else if (sheetName == "PERSENTASE KUNJUNGAN") {
      const data = await DashboardKeuanganRegional.PresentaseKunjungan(
        spreadsheetData,
        dataRegional.id
      );
      return resSuccess(
        res,
        `GeneralScoreBoardAllRegional -> ${sheetName}`,
        data
      );
    } else if (sheetName == "REKAP OPERASIONAL") {
      const data = await DashboardKeuanganRegional.RekapOperasional(
        spreadsheetData,
        dataRegional.id
      );
      return resSuccess(
        res,
        `GeneralScoreBoardAllRegional -> ${sheetName}`,
        data
      );
    } else if (sheetName == "REKAP OMZET PER SHIFT") {
      const data = await DashboardKeuanganRegional.RekapOmzetPerShift(
        spreadsheetData,
        dataRegional.id
      );
      return resSuccess(
        res,
        `GeneralScoreBoardAllRegional -> ${sheetName}`,
        data
      );
    } else if (sheetName == "REKAP MENU YANG TERJUAL") {
      const data = await DashboardKeuanganRegional.RekapMenuYangTerjual(
        spreadsheetData,
        dataRegional.id
      );
      return resSuccess(
        res,
        `GeneralScoreBoardAllRegional -> ${sheetName}`,
        data
      );
    } else {
      const data = dataset.sheet.map(e => e).toString();

      resError(res, `Sheet[name] = ${data}`, 404);
    }
  } catch (err) {
    return resError(res, err, 404);
  }

  res.send("GeneralDashboardKeuanganRegional");
};

exports.GeneralDashboardKeuanganNonCash = async (req, res) => {
  const schema = Joi.object({
    Date: Joi.object({
      year: Joi.number().min(2020).max(2025).required(),
      month: Joi.number().min(1).max(12).required(),
    }).required(),
    Sheet: Joi.object({
      name: Joi.string().required(),
    }).required(),
  });

  const {
    error,
    value
  } = schema.validate(req.body);
  if (error) {
    return resError(res, error.details[0].message, 404);
  }
  const {
    Date,
    Sheet
  } = value;

  try {
    const dataset = {
      year: [{
        id: 2020,
        month: [{
            id: 1,
            spreadsheetId: "1SjetdFCVj8QWq7uUXs8pfSGHpCXUz8X4QpzY74iHNJ0",
          },
          {
            id: 2,
            spreadsheetId: "",
          },
          {
            id: 3,
            spreadsheetId: "",
          },
          {
            id: 4,
            spreadsheetId: "",
          },
          {
            id: 5,
            spreadsheetId: "",
          },
          {
            id: 6,
            spreadsheetId: "",
          },
          {
            id: 7,
            spreadsheetId: "",
          },
          {
            id: 8,
            spreadsheetId: "",
          },
          {
            id: 9,
            spreadsheetId: "",
          },
          {
            id: 10,
            spreadsheetId: "",
          },
          {
            id: 11,
            spreadsheetId: "",
          },
          {
            id: 12,
            spreadsheetId: "",
          },
        ],
      }, ],
      sheet: [
        "GORESTO",
        "GRABRESTO",
        "GOJEK & GRAB",
        "SALDO GORESTO",
        "SALDO GRABRESTO",
      ],
    };

    const dataYear = dataset.year.find((e) => e.id == Date.year);
    if (!dataYear) return resError(res, `${Date.year} not found`, 404);
    const dataMonth = dataYear.month.find((e) => e.id == Date.month);
    if (!dataMonth) return resError(res, `${Date.month} not found`, 404);
    const sheetName = dataset.sheet.find((e) => e == Sheet.name);
    const sheetAll = dataset.sheet.join(' ,');
    if (!sheetName) return resError(res, `${Sheet.name} not found, available : ${sheetAll}`, 404);

    const {
      spreadsheetId
    } = dataMonth;

    const spreadsheetData = await Spreadsheet(spreadsheetId, sheetName);

    if (sheetName == "GORESTO") {
      const data = await DashboardNonCashAllRegional.GORESTO(spreadsheetData);
      return resSuccess(
        res,
        `GeneralScoreBoardAllRegional -> ${sheetName}`,
        data
      );
    } else if (sheetName == "GRABRESTO") {
      const data = await DashboardNonCashAllRegional.GRABRESTO(spreadsheetData);
      return resSuccess(
        res,
        `GeneralScoreBoardAllRegional -> ${sheetName}`,
        data
      );
    } else if (sheetName == "GOJEK & GRAB") {
      const data = await DashboardNonCashAllRegional.GOJEK_AND_GRAB(
        spreadsheetData
      );
      return resSuccess(
        res,
        `GeneralScoreBoardAllRegional -> ${sheetName}`,
        data
      );
    } else if (sheetName == "SALDO GORESTO") {
      const data = await DashboardNonCashAllRegional.SALDO_GORESTO(
        spreadsheetData
      );
      return resSuccess(
        res,
        `GeneralScoreBoardAllRegional -> ${sheetName}`,
        data
      );
    } else if (sheetName == "SALDO GRABRESTO") {
      const data = await DashboardNonCashAllRegional.SALDO_GRABRESTO(
        spreadsheetData
      );
      return resSuccess(
        res,
        `GeneralScoreBoardAllRegional -> ${sheetName}`,
        data
      );
    } else {
      resError(res, `${sheetName} not found`, 404);
    }
  } catch (err) {
    return resError(res, err, 404);
  }
};

exports.GeneralScoreBoardAllRegional = async (req, res) => {
  const schema = Joi.object({
    Date: Joi.object({
      year: Joi.number().min(2020).max(2025).required(),
      month: Joi.number().min(1).max(12).required(),
    }).required(),
    Sheet: Joi.object({
      name: Joi.string().required(),
    }).required(),
  });

  const {
    error,
    value
  } = schema.validate(req.body);
  if (error) {
    return resError(res, error.details[0].message, 404);
  }

  try {
    const {
      Date,
      Sheet
    } = value;

    const dataset = {
      year: [{
        id: 2020,
        month: [{
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
      }, ],
      sheet: ["DATA", 'SHARE PROFIT & BEP', 'MINGGU 1', 'MINGGU 2', 'MINGGU 3', 'MINGGU 4', 'MINGGU 5', 'BIAYA TAMBAHAN', 'FINAL', 'PPH'],
    };

    const datasetYear = dataset.year.find(
      (e) => e.id == Date.year
    );
    if (!datasetYear) return resError(res, `${Date.year} not found`, 404);

    const datasetMonth = datasetYear.month.find(
      (e) => e.id == Date.month
    );
    if (!datasetMonth) return resError(res, `${Date.month} not found`, 404);

    const sheetName = dataset.sheet.find((item) => item == Sheet.name);
    const sheetAll = dataset.sheet.join(' ,');
    if (!sheetName) {
      return resError(res, `${Sheet.name} not found, tersedia : ${sheetAll}`, 404);
    }

    const spreadsheetId = datasetMonth.spreadsheetId;

    const spreadsheetData = await Spreadsheet(spreadsheetId, sheetName);
    if (!spreadsheetData) return resError(res, `error`, 404);
    const data = [];

    if (sheetName == "DATA") {
      spreadsheetData.forEach((item, i) => {
        if (i > 5) {
          const result = {
            // no: item[0] || "",
            outlet: item[1] || "",
            regional: item[2] || "",
            nama_mitra: item[3] || "",
            bank: item[4] || "",
            no_rek: item[5] || "",
            an_rek: item[6] || "",
            pic: item[7] || "",
            ppn: item[8] || "",
          };

          data.push(result);
        }
      });
    } else if (sheetName == "SHARE PROFIT & BEP") {
      spreadsheetData.forEach((item, i) => {
        if (i > 5) {
          const result = {
            // no: item[0] || "",
            outlet: item[1] || "",
            share_profit: {
              nelongso: item[2] || "",
              persentase_nelongso: item[3] || "",
              mitra: item[4] || "",
              persentase_mitra: item[5] || "",
            },
            bep: {
              nelongso: item[6] || "",
              persentase_nelongso: item[7] || "",
              mitra: item[8] || "",
              persentase_mitra: item[9] || "",
            },
            keterangan: item[10] || "",
          };

          data.push(result);
        }
      });
    } else if (
      sheetName == "MINGGU 1" ||
      sheetName == "MINGGU 2" ||
      sheetName == "MINGGU 3" ||
      sheetName == "MINGGU 4" ||
      sheetName == "MINGGU 5"
    ) {
      spreadsheetData.forEach((item, i) => {
        if (i > 5) {
          const result = {
            no: item[0] || "",
            outlet: item[1] || "",
            regional: item[2] || "",
            omzet: {
              penjualan: item[3] || "",
              ppn: item[4] || "",
              gojek: item[5] || "",
              grab: item[6] || "",
              omset: item[7] || "",
              target: item[8] || "",
              persentase: item[9] || "",
            },
            harga_pokok_penjualan: {
              harga_pokok_penjualan: item[10] || "",
              hpp: item[11] || "",
              target_hpp: item[12] || "",
              pencapaian_hpp: item[13] || "",
            },
            total_operasional_produksi: {
              bensin: item[14] || "",
              listrik: item[15] || "",
              pdam: item[16] || "",
              wifi: item[17] || "",
              sedotan_limbah: item[18] || "",
              sewa_mess: item[19] || "",
              atk: item[20] || "",
              peralatan: item[21] || "",
              perlengkapan: item[22] || "",
              pemeliharaan_kendaraan_and_peralatan: item[23] || "",
              sewa_lahan_parkir: item[24] || "",
              konsumsi_karyawan: item[25] || "",
              laundry: item[26] || "",
              iuran_warga: item[27] || "",
              sampah: item[28] || "",
              sewa_ruko: item[29] || "",
              rnd: item[30] || "",
              perbaikan_outlet: item[31] || "",
              biaya_lain_lain: item[32] || "",
              total_operasional_produksi: item[33] || "",
              persentase_operasional_produksi: item[34] || "",
              target_operasional_produksi: item[35] || "",
              pecapaian_operasional_produksi: item[36] || "",
            },
            operasional_non_produksi: {
              pph: item[37] || "",
              sedekah: item[38] || "",
              bpjs: item[39] || "",
              perawatan_program: item[40] || "",
              beklame: item[41] || "",
              reward: item[42] || "",
              pbb: item[43] || "",
              admin_bank: item[44] || "",
              total_operasional_non_produksi: item[45] || "",
              persentase_operasional_non_produksi: item[46] || "",
              target_operasional_non_produksi: item[47] || "",
              pecapaian_operasional_non_produksi: item[48] || "",
            },
            promo_marketing: item[49] || "",
            gross_profit: item[50] || "",
            beban_gaji: {
              beban_gaji: item[51] || "",
              gaji: item[52] || "",
              target_gaji: item[53] || "",
              pecapaian_gaji: item[54] || "",
            },
            net_profit: {
              net_profit: item[55] || "",
              persentase_net_profit: item[56] || "",
              target_net_profit: item[57] || "",
              pencapaian_net_profit: item[58] || "",
            },
            pic: item[59] || "",
          };

          data.push(result);
        }
      });
    } else if (sheetName == "BIAYA TAMBAHAN") {
      spreadsheetData.forEach((item, i) => {
        if (i > 5) {
          const result = {
            no: item[0] || "",
            outlet: item[1] || "",
            regional: item[2] || "",
            total_operasional_produksi: {
              bensin: item[3] || "",
              listrik: item[4] || "",
              pdam: item[5] || "",
              wifi: item[6] || "",
              sedotan_limbah: item[7] || "",
              sewa_mess: item[8] || "",
              atk: item[9] || "",
              peralatan: item[10] || "",
              perlengkapan: item[11] || "",
              pemeliharaan_kendaraan_and_peralatan: item[12] || "",
              sewa_lahan_parkir: item[13] || "",
              konsumsi_karyawan: item[14] || "",
              laundry: item[15] || "",
              iuran_warga: item[16] || "",
              sampah: item[17] || "",
              sewa_ruko: item[18] || "",
              rnd: item[19] || "",
              perbaikan_outlet: item[20] || "",
              biaya_lain_lain: item[21] || "",
            },
            total_operasional_non_produksi: {
              pph: item[22] || "",
              sedekah: item[23] || "",
              bpjs: item[24] || "",
              perawatan_program: item[25] || "",
              reklame: item[26] || "",
              reward: item[27] || "",
              pbb: item[28] || "",
              admin_bank: item[29] || "",
              lain_lain: item[30] || "",
            },
          };

          data.push(result);
        }
      });
    } else if (sheetName == "FINAL") {
      spreadsheetData.forEach((item, i) => {
        if (i > 5) {
          const result = {
            // no: item[0] || "",
            outlet: item[0] || "",
            regional: item[1] || "",
            omzet: {
              penjualan: item[2] || "",
              ppn: item[3] || "",
              gojek: item[4] || "",
              grab: item[5] || "",
              omset: item[6] || "",
              targe: item[7] || "",
              persentase: item[8] || "",
            },
            harga_pokok_penjualan: {
              harga_pokok_penjualan: item[9] || "",
              persentase_hpp: item[10] || "",
              target_hpp: item[11] || "",
              pencapaian_hpp: item[12] || "",
            },
            marketing: {
              beban_pemasaran_and_iklan: item[13] || "",
              persentase_marketing: item[14] || "",
              target_marketing: item[15] || "",
              pencapaian_marketing: item[16] || "",
            },
            beban_gaji: {
              beban_gaji: item[17] || "",
              persentase_gaji: item[18] || "",
              target_gaji: item[19] || "",
              pencapaian_gaji: item[20] || "",
            },
            total_operasional_produksi: {
              bensin: item[21] || "",
              listrik: item[22] || "",
              pdam: item[23] || "",
              wifi: item[24] || "",
              sedotan_limbah: item[25] || "",
              sewa_mess: item[26] || "",
              atk: item[27] || "",
              peralatan: item[28] || "",
              perlengkapan: item[29] || "",
              pemeliharaan_kendaraan_and_peralatan: item[30] || "",
              sewa_lahan_parkir: item[31] || "",
              konsumsi_karyawan: item[32] || "",
              laundry: item[33] || "",
              iuran_warga: item[34] || "",
              sampah: item[35] || "",
              sewa_ruko: item[36] || "",
              rnd: item[37] || "",
              perbaikan_outlet: item[38] || "",
              biaya_lain_lain: item[39] || "",
              lain_lain: item[40] || "",
              total_operasional_produksi: item[41] || "",
              persentase_operasional_produksi: item[42] || "",
              target_operasional_produksi: item[43] || "",
              pencapaian_operasional: item[44] || "",
            },
            total_operasional_non_produksi: {
              pph: item[45] || "",
              sedekah: item[46] || "",
              bpjs: item[47] || "",
              perawatan_program: item[48] || "",
              reklame: item[49] || "",
              reward: item[50] || "",
              pbb: item[51] || "",
              admin_bank: item[52] || "",
              lain_lain: item[53] || "",
              total_operasional_non_produksi: item[54] || "",
              persentase_operasional_non_produksi: item[55] || "",
              target_operasional_non_produksi: item[56] || "",
              pencapaian_non_operasional: item[57] || "",
            },
            net_profit: {
              net_profit: item[58] || "",
              persentase_net_profit: item[59] || "",
              target_net_profit: item[60] || "",
              pencapaian_net_profit: item[61] || "",
            },
            share_profit: {
              nelongso: item[62] || "",
              mitra: item[63] || "",
            },
          };

          data.push(result);
        }
      });
    } else if (sheetName == "PPH") {
      const month = Number(Date.month) == 1 ? 12 : Number(Date.month);

      const bulan_nowName = datasetMonth.name;
      const bulan_after = datasetYear.month.find((item) => item.id == month);
      const bulan_afterName = bulan_after.name;

      spreadsheetData.forEach((item, i) => {
        if (i > 6) {
          const result = {
            // no: item[0] || "",
            outlet: item[0] || "",
            [bulan_nowName]: {
              net_profit: item[1] || "",
              persentase: item[2] || "",
              pph: item[3] || "",
            },
            [bulan_afterName]: {
              net_profit: item[4] || "",
              persentase: item[5] || "",
              pph: item[6] || "",
            },
          };

          data.push(result);
        }
      });
    } else {
      return resError(res, `Failure input`, 404);
    }

    return resSuccess(res, "GeneralScoreBoardAllRegional", data);
  } catch (err) {
    return resError(res, err, 404);
  }
};

exports.FinanceAnalytics = async (req, res) => {
  const schema = Joi.object({
    Date: Joi.object({
      year: Joi.number().min(2020).max(2025).required(),
      month: Joi.number().min(0).max(12).required(),
    }).required(),
  });

  const {
    error,
    value
  } = schema.validate(req.body);
  if (error) {
    return resError(res, error.details[0].message, 404);
  }
  const {
    Date
  } = value;

  try {
    const dataset = {
      spreadsheet: [{
        year: 2020,
        id: "1LNeZn26qZicFXoJixdMaoh_FdmhFKW0ppk31eX-OCoo",
      }, ],
      sheet: [{
          month: 0,
          name: "TARGET OMZET",
        },
        {
          month: 1,
          name: "JANUARI",
        },
        {
          month: 2,
          name: "FEBRUARI",
        },
        {
          month: 3,
          name: "MARET",
        },
        {
          month: 4,
          name: "APRIL",
        },
        {
          month: 5,
          name: "MEI",
        },
        {
          month: 6,
          name: "JUNI",
        },
        {
          month: 7,
          name: "JULI",
        },
        {
          month: 8,
          name: "AGUSTUS",
        },
        {
          month: 9,
          name: "SEPTEMBER",
        },
        {
          month: 10,
          name: "OKTOBER",
        },
        {
          month: 11,
          name: "NOVEMBER",
        },
        {
          month: 12,
          name: "DESEMBER",
        },
      ],
    };

    const dataYear = dataset.spreadsheet.find(
      (item) => item.year == Number(Date.year)
    );

    if (!dataYear) {
      return resError(res, `${Date.year} not found`, 404);
    }

    const spreadsheetId = dataYear.id;

    const dataMonth = dataset.sheet.find(
      (item) => item.month == Number(Date.month)
    );

    const sheetName = dataMonth.name;
    if (!sheetName) {
      return resError(res, `${Date.month} not found`, 404);
    }

    const spreadsheetData = await Spreadsheet(spreadsheetId, sheetName);

    const data = [];

    if (Number(Date.month) == 0) {
      spreadsheetData.forEach((item, i) => {
        if (i > 5) {
          const result = {
            outlet: item[0],
            regional: item[1],
            januari: item[2],
            febuari: item[3],
            maret: item[4],
            april: item[5],
            mei: item[6],
            juni: item[7],
            juli: item[8],
            agustus: item[9],
            september: item[10],
            oktober: item[11],
            november: item[12],
            desember: item[13],
          };

          data.push(result);
        }
      });
    } else {
      spreadsheetData.forEach((item, i) => {
        if (i > 5) {
          const result = {
            no: item[0],
            nama_outlet: item[1],
            regional: item[2],
            bulan: item[3],
            hpp: item[4],
            op: item[5],
            op_pro: item[6],
            op_non_pro: item[7],
            beban_gaji: item[8],
            marketing: item[9],
            net: item[10],
            jumlah_karyawan: item[11],
            produktivitas: item[12],
          };

          data.push(result);
        }
      });
    }
    return resSuccess(res, "GET_FINANCE_ANALYTICS", data);
  } catch (err) {
    return resError(res, err, 404);
  }
};

exports.OutletProfiles = async (req, res) => {
  const dataset = {
    spreadsheet: "1aeL8_r9cQ9wdlNp660Ld2LeFD_SpD4lApmmdeN2eNCg",
    sheet: "DATA OUTLET",
  };

  try {
    const spreadsheetData = await Spreadsheet(
      dataset.spreadsheet,
      dataset.sheet
    );

    const data = [];

    spreadsheetData.forEach((item, i) => {
      if (i > 0) {
        const result = {
          keterangan: item[0],
          outlet: item[1],
          brand: item[2],
          regional: item[3],
          status: item[4],
          jenis: item[5],
          aplikasi: item[6],
          biaya_lainnya: item[7],
          share_profit_nelongso: item[8],
          share_profit_mitra: item[9],
          status_bep: item[10],
          bep_nelongso: item[11],
          bep_mitra: item[12],
          ppn: item[13],
        };

        data.push(result);
      }
    });

    return resSuccess(res, "GET_OUTLET_PROFILES", data);
  } catch (err) {
    return resError(res, err, 404);
  }
};