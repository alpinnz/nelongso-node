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
          regional: [
            {
              id: "jabar",
              spreadsheetId: null,
            },
            {
              id: "jatim1",
              spreadsheetId: null,
            },
            {
              id: "jatim2",
              spreadsheetId: null,
            },
            {
              id: "jatim3",
              spreadsheetId: null,
            },
          ],
        },
        {
          id: 2,
          regional: [
            {
              id: "jabar",
              spreadsheetId: null,
            },
            {
              id: "jatim1",
              spreadsheetId: null,
            },
            {
              id: "jatim2",
              spreadsheetId: null,
            },
            {
              id: "jatim3",
              spreadsheetId: null,
            },
          ],
        },
        {
          id: 3,
          regional: [
            {
              id: "jabar",
              spreadsheetId: null,
            },
            {
              id: "jatim1",
              spreadsheetId: null,
            },
            {
              id: "jatim2",
              spreadsheetId: null,
            },
            {
              id: "jatim3",
              spreadsheetId: null,
            },
          ],
        },
        {
          id: 4,
          regional: [
            {
              id: "jabar",
              spreadsheetId: null,
            },
            {
              id: "jatim1",
              spreadsheetId: null,
            },
            {
              id: "jatim2",
              spreadsheetId: null,
            },
            {
              id: "jatim3",
              spreadsheetId: null,
            },
          ],
        },
        {
          id: 5,
          regional: [
            {
              id: "jabar",
              spreadsheetId: null,
            },
            {
              id: "jatim1",
              spreadsheetId: null,
            },
            {
              id: "jatim2",
              spreadsheetId: null,
            },
            {
              id: "jatim3",
              spreadsheetId: null,
            },
          ],
        },
        {
          id: 6,
          regional: [
            {
              id: "jabar",
              spreadsheetId: null,
            },
            {
              id: "jatim1",
              spreadsheetId: null,
            },
            {
              id: "jatim2",
              spreadsheetId: null,
            },
            {
              id: "jatim3",
              spreadsheetId: null,
            },
          ],
        },
        {
          id: 7,
          regional: [
            {
              id: "jabar",
              spreadsheetId: null,
            },
            {
              id: "jatim1",
              spreadsheetId: null,
            },
            {
              id: "jatim2",
              spreadsheetId: null,
            },
            {
              id: "jatim3",
              spreadsheetId: null,
            },
          ],
        },
        {
          id: 8,
          regional: [
            {
              id: "jabar",
              spreadsheetId: null,
            },
            {
              id: "jatim1",
              spreadsheetId: null,
            },
            {
              id: "jatim2",
              spreadsheetId: null,
            },
            {
              id: "jatim3",
              spreadsheetId: null,
            },
          ],
        },
        {
          id: 9,
          regional: [
            {
              id: "jabar",
              spreadsheetId: null,
            },
            {
              id: "jatim1",
              spreadsheetId: null,
            },
            {
              id: "jatim2",
              spreadsheetId: null,
            },
            {
              id: "jatim3",
              spreadsheetId: null,
            },
          ],
        },
        {
          id: 10,
          regional: [
            {
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
        },

        {
          id: 12,
          regional: [
            {
              id: "jabar",
              spreadsheetId: null,
            },
            {
              id: "jatim1",
              spreadsheetId: null,
            },
            {
              id: "jatim2",
              spreadsheetId: null,
            },
            {
              id: "jatim3",
              spreadsheetId: null,
            },
          ],
        },
      ],
    },
  ],
  getSheetName: [
    "REKAP OUTLET BULANAN",
    "REKAP HPP SUPPLIER",
    "REKAP OMZET OFFLINE & ONLINE",
    "REKAP KUNJUNGAN",
    "PERSENTASE KUNJUNGAN",
    "REKAP OPERASIONAL",
    "REKAP OMZET PER SHIFT",
    "REKAP MENU YANG TERJUAL",
  ],
};

const jabarOutlets = [
  "bekasi",
  "depok",
  "jatinangor",
  "kiaracondong",
  "koposayati",
  "setiabudi",
];

const jatim1Outlets = [
  "batu",
  "blimbing",
  "bululawang",
  "buring",
  "dieng",
  "kepanjen",
  "pakis",
  "sawojajar",
  "sigura_gura",
  "singosari",
  "suhat_new",
  "sukun",
  "sulfat",
  "trunojoyo",
  "turen",
  "um",
  "nnmuh",
];

const jatim2Outlets = [
  "dharmawangsa",
  "ketintang",
  "klampis",
  "mulyosari",
  "panjang_jiwo",
  "siwalan_kerto",
  "tropodo",
  "untag",
  "upn",
  "wijaya_kusuma",
  "wiyung",
  "margorejo",
];

const jatim3Outlets = [
  "bali_1_tukad_barito",
  "bali_1_dewi_sri",
  "gresik",
  "jember_1_mastrip",
  "jember_2_unej",
  "jombang",
  "kediri",
  "mediun",
  "mojokerto",
  "pare",
  "pasuruan",
  "sidoarjo",
  "tulungagung",
  "yogyakarta",
];

const jabarHpp = [
  "pak_asep",
  "rojul",
  "pak_solihin",
  "pak_adi",
  "pak_hari",
  "pak_didin",
  "pak_yuda",
  "mbak_ines",
  "davina",
  "pak_anjar/ramli",
  "pak_bambang",
  "dapur_pusat",
];

const jatim1Hpp = [
  "samsul",
  "alfi",
  "huna",
  "irul",
  "devi",
  "dapur_pusat",
  "pulung",
  "santi",
  "toni",
];

const jatim2Hpp = [
  "hasyim",
  "mubarok",
  "ida",
  "supri",
  "mangga_dua",
  "ganda",
  "sukri",
  "whayu",
  "unggas_jaya",
  "mojokerto",
  "tomi",
  "eko",
  "dapur_pusat",
  "njf",
  "amir",
  "trias",
  "fendi",
  "kamal",
];

const jatim3Hpp = [
  "firdaus",
  "kodrat",
  "samsul",
  "wahyu",
  "muhammad",
  "mbak_ita",
  "yuni",
  "pak_aziz",
  "pak_mubarok",
  "mbak_erna",
  "harmaji",
  "ndaru_bloiler",
  "orin1",
  "duet_langgeng",
  "yuli",
  "pak_putut",
  "pak_didit",
  "saayilla",
  "aris",
  "rovik",
  "dapur_pusat",
  "pak_agus",
  "yakup1",
  "orin2",
  "yakup2",
  "ndarubloiler",
  "omah_jamur",
  "wiwit",
  "kumbung",
  "awik",
];

const Hpp = (regional) => {
  if (regional == "jabar") {
    return jabarHpp;
  } else if (regional == "jatim1") {
    return jatim1Hpp;
  } else if (regional == "jabar2") {
    return jatim2Hpp;
  } else if (regional == "jatim3") {
    return jatim3Hpp;
  } else {
    return null;
  }
};

const Outlets = (regional) => {
  if (regional == "jabar") {
    return jabarOutlets;
  } else if (regional == "jatim1") {
    return jatim1Outlets;
  } else if (regional == "jatim2") {
    return jatim2Outlets;
  } else if (regional == "jatim3") {
    return jatim3Outlets;
  } else {
    return null;
  }
};

exports.ReadAll = async (req, res) => {
  const schema = Joi.object({
    regional: Joi.string().required(),
    year: Joi.number().min(2020).max(2021).required(),
    month: Joi.number().min(1).max(12).required(),
    sheet: Joi.string().required(),
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
    const dataRegional = dataMonth.regional.find((e) => e.id == Body.regional);
    if (!dataRegional) return resError(res, `${Body.regional} not found`, 404);
    const sheetName = DataSet.getSheetName.find((e) => e == Body.sheet);

    if (!sheetName) {
      const dataSheet = DataSet.getSheetName.join(", ");
      return resError(
        res,
        `${Body.sheet} not found ,available : ${dataSheet}`,
        404
      );
    }

    const { spreadsheetId } = dataRegional;
    // Data SpreadSheet
    const spreadsheetData = await Spreadsheet(spreadsheetId, sheetName);
    // _________________
    if (!spreadsheetData) return resError(res, "spreadsheetData null", 404);
    let data = [];

    if (sheetName == "REKAP OUTLET BULANAN") {
      const header_line = 7;

      spreadsheetData.forEach((e, index) => {
        if (index > header_line) {
          const columns = [
            "omzet",
            "hpp",
            "setoran_kotor",
            "margin",
            "operasional",
            "setoran_bersih",
            "stok_bahan_baku",
            "grab",
            "gojek",
            "ppn",
            "gudang",
            "beli_diluar",
          ];
          ``;

          let cols = {};
          let i_column = 0;

          const outlets = Outlets(Body.regional);
          const outletXcolums = outlets.length * columns.length;
          const length = outletXcolums + 1;
          if (e.length <= length) {
            const net_length = length - e.length;
            for (let i = 0; i < net_length; i++) {
              e.push("");
            }
          }

          for (let i = 0; i < e.length; i++) {
            if (i == 0) {
              cols["tanggal"] = e[i];
            }
            if (i > 0 && i % columns.length == 0) {
              let outlet = {};
              let i_col = i - (columns.length - 1);
              columns.forEach((element) => {
                outlet[element] = e[i_col];
                i_col++;
              });

              cols[outlets[i_column]] = outlet;
              i_column++;
            }
          }

          data.push(cols);
        }
      });
    } else if (sheetName == "REKAP HPP SUPPLIER") {
      const header_line = 6;
      const hpp = Hpp(Body.regional);

      spreadsheetData.forEach((e, index) => {
        if (index > header_line) {
          let cols = {};
          let i_column = 0;

          const outlets = Outlets(Body.regional);
          const outletXcolums = outlets.length * hpp.length;
          const length = outletXcolums + 1;
          if (e.length <= length) {
            const net_length = length - e.length;
            for (let i = 0; i < net_length; i++) {
              e.push("");
            }
          }

          for (let i = 0; i < e.length; i++) {
            if (i == 0) {
              cols["tanggal"] = e[i];
            }
            if (i > 0 && i % hpp.length == 0) {
              let outlet = {};
              let i_col = i - (hpp.length - 1);
              hpp.forEach((element) => {
                outlet[element] = e[i_col];
                i_col++;
              });

              cols[outlets[i_column]] = outlet;
              i_column++;
            }
          }

          data.push(cols);
        }
      });
    } else if (sheetName == "REKAP OMZET OFFLINE & ONLINE") {
      const header_line = 7;

      spreadsheetData.forEach((e, index) => {
        if (index > header_line) {
          const columns = ["online", "offline"];

          let cols = {};
          let i_column = 0;

          var outlets = Outlets(Body.regional);
          outlets.push("total");

          const outletXcolums = outlets.length * columns.length;
          const length = outletXcolums + 1;
          if (e.length <= length) {
            const net_length = length - e.length;
            for (let i = 0; i < net_length; i++) {
              e.push("");
            }
          }

          for (let i = 0; i < e.length; i++) {
            if (i == 0) {
              cols["tanggal"] = e[i];
            }
            if (i > 0 && i % columns.length == 0) {
              let outlet = {};
              let i_col = i - (columns.length - 1);
              columns.forEach((element) => {
                outlet[element] = e[i_col];
                i_col++;
              });

              cols[outlets[i_column]] = outlet;
              i_column++;
            }
          }

          data.push(cols);
        }
      });
    } else if (sheetName == "REKAP KUNJUNGAN") {
      const header_line = 7;

      const newData = await spreadsheetData.map((e) => e.slice(1));

      newData.forEach((e, index) => {
        if (index > header_line) {
          const columns = [
            "malam",
            "pagi_1",
            "pagi_2",
            "sore_1",
            "sore_2",
            "total_kunjungan",
          ];

          let cols = {};
          let i_column = 0;

          var outlets = Outlets(Body.regional);
          outlets.push("total");

          const outletXcolums = outlets.length * columns.length;
          const length = outletXcolums + 1;
          if (e.length <= length) {
            const net_length = length - e.length;
            for (let i = 0; i < net_length; i++) {
              e.push("");
            }
          }

          for (let i = 0; i < e.length; i++) {
            if (i == 0) {
              cols["tanggal"] = e[i];
            }
            if (i > 0 && i % columns.length == 0) {
              let outlet = {};
              let i_col = i - (columns.length - 1);
              columns.forEach((element) => {
                outlet[element] = e[i_col];
                i_col++;
              });

              cols[outlets[i_column]] = outlet;
              i_column++;
            }
          }

          data.push(cols);
        }
      });
    } else if (sheetName == "PERSENTASE KUNJUNGAN") {
      const header_line = 8;

      const newData = await spreadsheetData.map((e) => e.slice(1));

      newData.forEach((e, index) => {
        if (index > header_line) {
          const columns = [
            "malam",
            "pagi_1",
            "pagi_2",
            "sore_1",
            "sore_2",
            "total_kunjungan",
          ];

          const model = (
            mJ,
            mP,
            p1J,
            p1P,
            p2J,
            p2P,
            s1J,
            s1P,
            s2J,
            s2P,
            totalK
          ) => {
            return {
              malam: {
                jumlah: mJ,
                persentase: mP,
              },
              pagi_1: {
                jumlah: p1J,
                persentase: p1P,
              },
              pagi_2: {
                jumlah: p2J,
                persentase: p2P,
              },
              sore_1: {
                jumlah: s1J,
                persentase: s1P,
              },
              sore_2: {
                jumlah: s2J,
                persentase: s2P,
              },
              total_kunjungan: totalK,
            };
          };

          let cols = {};
          let i_column = 0;

          var outlets = Outlets(Body.regional);
          i_outlet = 0;
          outlets.push("total");

          const outletXcolums = outlets.length * columns.length;
          const length = outletXcolums + 1;
          if (e.length <= length) {
            const net_length = length - e.length;
            for (let i = 0; i < net_length; i++) {
              e.push("");
            }
          }

          for (let i = 0; i < e.length; i++) {
            if (i == 0) {
              cols["tanggal"] = e[i];
            }
            if (i > 0 && i % 11 == 0) {
              cols[outlets[i_outlet]] = model(
                e[i - 10],
                e[i - 9],
                e[i - 8],
                e[i - 7],
                e[i - 6],
                e[i - 5],
                e[i - 4],
                e[i - 3],
                e[i - 2],
                e[i - 1],
                e[i]
              );
              i_outlet++;
            }
          }

          data.push(cols);
        }
      });
    } else if (sheetName == "REKAP OPERASIONAL") {
      const header_line = 8;

      spreadsheetData.forEach((e, i) => {
        const row = {};
        row["outlet"] = e[0];
        row["operasional"] = {
          bensin: e[1],
          listrik: e[2],
          pdam: e[3],
          wifi: e[4],
          sedot_lembah: e[5],
          sewa_mess: e[6],
          sedekah: e[7],
          atk: {
            thermal: e[8],
            fc: e[9],
            atk1: e[10],
            atk2: e[11],
            atk3: e[12],
            atk4: e[13],
            atk5: e[14],
            atk6: e[15],
            total_atk: e[16],
          },
          peralatan: {
            shooper: e[17],
            blender: e[18],
            regulator: e[19],
            peralatan1: e[20],
            peralatan2: e[21],
            peralatan3: e[22],
            peralatan4: e[23],
            peralatan5: e[24],
            total_peralatan: e[25],
          },
          perlengkapan: {
            obat: e[26],
            sabut: e[27],
            perlengkapan1: e[28],
            perlengkapan2: e[29],
            perlengkapan3: e[30],
            perlengkapan4: e[31],
            perlengkapan5: e[32],
            perlengkapan6: e[33],
            total_perlengkapan: e[34],
          },
          lain_lain: {
            sewa_lahan_parkir: e[35],
            konsumsi_karyawan: e[36],
            laundry: e[37],
            iuran_warga: e[38],
            sampah: e[39],
            lain_lain1: e[40],
            lain_lain2: e[41],
            lain_lain3: e[42],
            total_lain_lain: e[43],
          },
        };
        if (i > header_line) {
          data.push(row);
        }
      });
    } else if (sheetName == "REKAP OMZET PER SHIFT") {
      const header_line = 5;

      const newData = await spreadsheetData.map((e) => e.slice(1));

      let outlets = Outlets(Body.regional);

      outlets.push("total");

      const cols = [
        "omset_malam",
        "omset_pagi1",
        "omset_pagi2",
        "omset_sore1",
        "omset_sore2",
        "total_omset",
      ];

      newData.forEach((e, i) => {
        let row = {};
        let i_outlet = 0;
        for (let i = 0; i < e.length; i++) {
          if (i == 0) {
            row["tanggal"] = e[i];
          }

          if (i > 0 && i % cols.length == 0) {
            let col = {};
            let i_col = i - (cols.length - 1);
            cols.forEach((item) => {
              col[item] = e[i_col];
              i_col++;
            });

            row[outlets[i_outlet]] = col;
            i_outlet++;
          }
        }

        if (i > header_line) {
          data.push(row);
        }
      });
    } else if (sheetName == "REKAP MENU YANG TERJUAL") {
      const header_line = 7;

      const newData = await spreadsheetData.map((e) => e.slice(1));
      if (!newData) {
        return null;
      }

      let outlets = Outlets(Body.regional);

      outlets.push("total");

      const cols = ["menu", "kategori", "status"];

      const outlet_cols = ["malam", "pagi", "sore", "total"];

      newData.forEach((e, i) => {
        let row = {};
        let i_outlet = 0;
        for (let i = 0; i < e.length; i++) {
          if (i == 0) {
            cols.forEach((item) => {
              row[item] = e[i];
              i++;
            });
          }

          if (i > 0 && i % outlet_cols.length == 0) {
            i = i + 2;
            let col = {};
            let i_outlet_col = i - (outlet_cols.length - 1);
            outlet_cols.forEach((item) => {
              col[item] = e[i_outlet_col];
              i_outlet_col++;
            });

            row[outlets[i_outlet]] = col;
            i_outlet++;
          }
        }

        if (i > header_line) {
          data.push(row);
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
