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
    const titleKey = (text) => {
      const string = `${text}`;
      const filter1 = string.substring(0, 1).replace(" ", "");
      const filter2 = string.substring(1);
      const titleText = filter1 + filter2;
      return titleText.replace(/ /g, "_").toLowerCase();
    };

    if (sheetName == "REKAP OUTLET BULANAN") {
      let outlets = [];
      spreadsheetData[6].forEach((e, i) => {
        if (i > 0 && e != null && e != "") {
          outlets.push(e);
        }
      });
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
    } else if (sheetName == "REKAP HPP SUPPLIER") {
      let outlets = [];
      spreadsheetData[5].forEach((e, i) => {
        if (i > 0 && e != null && e != "") {
          outlets.push(e);
        }
      });

      const indexColumns = (spreadsheetData[6].length - 1) / outlets.length;
      let columns = spreadsheetData[6].slice(1, indexColumns + 1);

      const lineHeader = 6;
      spreadsheetData.forEach((e, i) => {
        if (i > lineHeader) {
          let row = {};
          row["tanggal"] = e[0];
          let data_outlet = [];
          let index = 0;
          outlets.forEach((child) => {
            let valueItems = [];
            const title = titleKey(child);
            columns.forEach((item) => {
              index++;
              const titleSub = titleKey(item);
              // valueColumns[titleSub] = e[index] || "";
              valueItems.push({
                nama: titleSub,
                nominal: e[index] || "",
              });
            });
            data_outlet.push({
              nama: title,
              data: valueItems,
            });
          });
          row["outlets"] = data_outlet;
          data.push(row);
        } else {
          i = lineHeader + 1;
        }
      });
    } else if (sheetName == "REKAP OMZET OFFLINE & ONLINE") {
      let outlets = [];
      spreadsheetData[6].forEach((e, i) => {
        if (i > 0 && e != null && e != "") {
          outlets.push(e);
        }
      });
      const columns = ["online", "offline"];
      const lineHeader = 7;
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
    } else if (sheetName == "REKAP KUNJUNGAN") {
      const newSpreadsheetData = spreadsheetData.map((e) => e.slice(1));
      let outlets = [];
      newSpreadsheetData[6].forEach((e, i) => {
        if (i > 0 && e != null && e != "") {
          outlets.push(e);
        }
      });
      const columns = [
        "malam",
        "pagi_1",
        "pagi_2",
        "sore_1",
        "sore_2",
        "total_kunjungan",
      ];
      const lineHeader = 7;
      newSpreadsheetData.forEach((e, i) => {
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
    } else if (sheetName == "REKAP OMZET PER SHIFT") {
      const newSpreadsheetData = spreadsheetData.map((e) => e.slice(1));
      let outlets = [];
      newSpreadsheetData[6].forEach((e, i) => {
        if (i > 0 && e != null && e != "") {
          outlets.push(e);
        }
      });
      const columns = [
        "omset_malam",
        "omset_pagi_1",
        "omset_pagi_2",
        "omset_sore_1",
        "omset_sore_2",
        "total_omset",
      ];
      const lineHeader = 7;
      newSpreadsheetData.forEach((e, i) => {
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
    } else if (sheetName == "PERSENTASE KUNJUNGAN") {
      const header_line = 8;

      const newSpreadsheetData = spreadsheetData.map((e) => e.slice(1));
      let outlets = [];
      newSpreadsheetData[6].forEach((e, i) => {
        if (i > 0 && e != null && e != "") {
          outlets.push(e);
        }
      });
      const columns = [
        "malam",
        "pagi_1",
        "pagi_2",
        "sore_1",
        "sore_2",
        "total_kunjungan",
      ];
      newSpreadsheetData.forEach((e, index) => {
        if (index > header_line) {
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

          // var outlets = Outlets(Body.regional);
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
          let = data_outlet = [];
          for (let i = 0; i < e.length; i++) {
            if (i == 0) {
              cols["tanggal"] = e[i];
            }

            if (i > 0 && i % 11 == 0) {
              data_outlet.push({
                nama: outlets[i_outlet],
                data: model(
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
                ),
              });

              i_outlet++;
            }
          }
          cols["outlet"] = data_outlet;
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
    } else if (sheetName == "REKAP MENU YANG TERJUAL") {
      const newSpreadsheetData = spreadsheetData.map((e) => e.slice(1));
      let outlets = [];
      newSpreadsheetData[6].forEach((e, i) => {
        if (i > 2 && e != null && e != "") {
          outlets.push(e);
        }
      });
      const columns = ["malam", "pagi", "sore", "total"];
      const lineHeader = 7;
      newSpreadsheetData.forEach((e, i) => {
        if (i > lineHeader) {
          let row = {};
          row["menu"] = e[0];
          row["kategori"] = e[1];
          row["status"] = e[2];
          let data_outlet = [];
          let index = 2;
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
    } else {
      return resSuccess(res, `Keuangan -> ${sheetName}`, null);
    }
    return resSuccess(res, `Keuangan -> ${sheetName}`, data);
  } catch (err) {
    return resError(res, err, 404);
  }
};
