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
          id: 11,
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
          id: 12,
          regional: [
            {
              id: "jabar",
              spreadsheetId: "14WNFwBnbNEIF20oFvy8ILfy0_b9TjIpOJmmrHBTYIH8",
            },
            {
              id: "jatim1",
              spreadsheetId: "1pVFZvaTQSPrebI-xEeEGqw_c9HO9v1p3dQqJyBDbS3c",
            },
            {
              id: "jatim2",
              spreadsheetId: "1zIzo5XY-L1QOXLXp3Ur2DnHKvj_DBCxfUuzlqJOEews",
            },
            {
              id: "jatim3",
              spreadsheetId: "1yuNM6dkT9jn5BH02ewrHEPVARw1E_GFZq7K4WZoKFPk",
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
              valueColumns[item] = convertToFloat(e[index]) || "0.0";
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
      const temp_data = data[0]["outlets"].map((e, i) => {
        return {
          id: `${i + 1}`,
          nama_outlet: e["nama"],
          data: [],
        };
      });

      for (let i = 0; i < data.length; i++) {
        for (let x = 0; x < data[i]["outlets"].length; x++) {
          let res = data[i]["outlets"][x];
          let index = temp_data.findIndex((e) => e.nama_outlet == res["nama"]);
          res["data"]["id"] = data[i]["tanggal"];
          temp_data[index]["data"].push(res["data"]);
        }
      }

      data = temp_data;
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
                nominal: convertToFloat(e[index]) || "0.0",
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

      const temp_data = data[0]["outlets"].map((e, i) => {
        return {
          id: `${i + 1}`,
          nama_outlet: e["nama"],
          data: [],
        };
      });

      for (let i = 0; i < data.length; i++) {
        for (let x = 0; x < data[i]["outlets"].length; x++) {
          let res = data[i]["outlets"][x];
          let index = temp_data.findIndex((e) => e.nama_outlet == res["nama"]);
          // res["data"]["id"] = data[i]["tanggal"];
          temp_data[index]["data"].push({
            id: data[i]["tanggal"],
            supplier: res["data"],
          });
        }
      }

      data = temp_data;
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
              valueColumns[item] = convertToFloat(e[index]) || "0.0";
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

      const temp_data = data[0]["outlets"].map((e, i) => {
        return {
          id: `${i + 1}`,
          nama_outlet: e["nama"],
          data: [],
        };
      });

      for (let i = 0; i < data.length; i++) {
        for (let x = 0; x < data[i]["outlets"].length; x++) {
          let res = data[i]["outlets"][x];
          let index = temp_data.findIndex((e) => e.nama_outlet == res["nama"]);
          res["data"]["id"] = data[i]["tanggal"];
          temp_data[index]["data"].push(res["data"]);
        }
      }

      data = temp_data;
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
              valueColumns[item] = convertToFloat(e[index]) || "0.0";
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

      const temp_data = data[0]["outlets"].map((e, i) => {
        return {
          id: `${i + 1}`,
          nama_outlet: e["nama"],
          data: [],
        };
      });

      for (let i = 0; i < data.length; i++) {
        for (let x = 0; x < data[i]["outlets"].length; x++) {
          let res = data[i]["outlets"][x];
          let index = temp_data.findIndex((e) => e.nama_outlet == res["nama"]);
          res["data"]["id"] = data[i]["tanggal"];
          temp_data[index]["data"].push(res["data"]);
        }
      }

      data = temp_data;
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
              valueColumns[item] = convertToFloat(e[index]) || "0.0";
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

      const temp_data = data[0]["outlets"].map((e, i) => {
        return {
          id: `${i + 1}`,
          nama_outlet: e["nama"],
          data: [],
        };
      });

      for (let i = 0; i < data.length; i++) {
        for (let x = 0; x < data[i]["outlets"].length; x++) {
          let res = data[i]["outlets"][x];
          let index = temp_data.findIndex((e) => e.nama_outlet == res["nama"]);
          res["data"]["id"] = data[i]["tanggal"];
          temp_data[index]["data"].push(res["data"]);
        }
      }

      data = temp_data;
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
                  convertToFloat(e[i - 10]),
                  convertToFloat(e[i - 9]),
                  convertToFloat(e[i - 8]),
                  convertToFloat(e[i - 7]),
                  convertToFloat(e[i - 6]),
                  convertToFloat(e[i - 5]),
                  convertToFloat(e[i - 4]),
                  convertToFloat(e[i - 3]),
                  convertToFloat(e[i - 2]),
                  convertToFloat(e[i - 1]),
                  convertToFloat(e[i])
                ),
              });

              i_outlet++;
            }
          }
          cols["outlets"] = data_outlet;
          data.push(cols);
        }
      });

      const temp_data = data[0]["outlets"].map((e, i) => {
        return {
          id: `${i + 1}`,
          nama_outlet: e["nama"],
          data: [],
        };
      });

      for (let i = 0; i < data.length; i++) {
        for (let x = 0; x < data[i]["outlets"].length; x++) {
          let res = data[i]["outlets"][x];
          let index = temp_data.findIndex((e) => e.nama_outlet == res["nama"]);

          res["data"]["id"] = data[i]["tanggal"];
          temp_data[index]["data"].push(res["data"]);
        }
      }

      data = temp_data;
    } else if (sheetName == "REKAP OPERASIONAL") {
      const header_line = 7;
      let id = 1;
      spreadsheetData.forEach((e, i) => {
        const row = {};
        row["id"] = `${id}`;
        row["nama_outlet"] = e[0];
        row["operasional"] = {
          bensin: convertToFloat(e[1]) || "0.0",
          listrik: convertToFloat(e[2]) || "0.0",
          pdam: convertToFloat(e[3]) || "0.0",
          wifi: convertToFloat(e[4]) || "0.0",
          sedot_lembah: convertToFloat(e[5]) || "0.0",
          sewa_mess: convertToFloat(e[6]) || "0.0",
          sedekah: convertToFloat(e[7]) || "0.0",
          atk: {
            thermal: convertToFloat(e[8]) || "0.0",
            fc: convertToFloat(e[9]) || "0.0",
            atk1: convertToFloat(e[10]) || "0.0",
            atk2: convertToFloat(e[11]) || "0.0",
            atk3: convertToFloat(e[12]) || "0.0",
            atk4: convertToFloat(e[13]) || "0.0",
            atk5: convertToFloat(e[14]) || "0.0",
            atk6: convertToFloat(e[15]) || "0.0",
            total_atk: convertToFloat(e[16]) || "0.0",
          },
          peralatan: {
            shooper: convertToFloat(e[17]) || "0.0",
            blender: convertToFloat(e[18]) || "0.0",
            regulator: convertToFloat(e[19]) || "0.0",
            peralatan1: convertToFloat(e[20]) || "0.0",
            peralatan2: convertToFloat(e[21]) || "0.0",
            peralatan3: convertToFloat(e[22]) || "0.0",
            peralatan4: convertToFloat(e[23]) || "0.0",
            peralatan5: convertToFloat(e[24]) || "0.0",
            total_peralatan: convertToFloat(e[25]) || "0.0",
          },
          perlengkapan: {
            obat: convertToFloat(e[26]) || "0.0",
            sabut: convertToFloat(e[27]) || "0.0",
            perlengkapan1: convertToFloat(e[28]) || "0.0",
            perlengkapan2: convertToFloat(e[29]) || "0.0",
            perlengkapan3: convertToFloat(e[30]) || "0.0",
            perlengkapan4: convertToFloat(e[31]) || "0.0",
            perlengkapan5: convertToFloat(e[32]) || "0.0",
            perlengkapan6: convertToFloat(e[33]) || "0.0",
            total_perlengkapan: convertToFloat(e[34]) || "0.0",
          },
          lain_lain: {
            sewa_lahan_parkir: convertToFloat(e[35]) || "0.0",
            konsumsi_karyawan: convertToFloat(e[36]) || "0.0",
            laundry: convertToFloat(e[37]) || "0.0",
            iuran_warga: convertToFloat(e[38]) || "0.0",
            sampah: convertToFloat(e[39]) || "0.0",
            lain_lain1: convertToFloat(e[40]) || "0.0",
            lain_lain2: convertToFloat(e[41]) || "0.0",
            lain_lain3: convertToFloat(e[42]) || "0.0",
            total_lain_lain: convertToFloat(e[43]) || "0.0",
          },
        };
        if (i > header_line) {
          data.push(row);
          id++;
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
      let id = 1;
      newSpreadsheetData.forEach((e, i) => {
        if (i > lineHeader) {
          let row = {};
          row["id"] = `${id++}`;
          row["menu"] = e[0];
          row["kategori"] = e[1];
          row["status"] = e[2];
          let data_outlet = [];
          let index = 2;
          let sub_id = 1;
          outlets.forEach((child) => {
            let valueColumns = {};
            const title = titleKey(child);
            columns.forEach((item) => {
              index++;
              valueColumns[item] = convertToFloat(e[index]) || "0.0";
            });
            data_outlet.push({
              id: `${sub_id++}`,
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
