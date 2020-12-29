const {
  resError,
  resSuccess,
} = require("./../../../../helpers/HandleResponse");
const { Spreadsheet } = require("./../../../../config/Spreadsheet");
const Joi = require("joi");

const DataSet = {
  year: [
    {
      id: 2021,
      regional: [
        {
          id: "jabar",
          outlet: [
            {
              id: "bekasi",
              spreadsheetId: "1rOdW86hVqgV6BrfQhgROJj6PtFSB2aN-eoH8N3LYi-s",
            },
            {
              id: "depok",
              spreadsheetId: "1g5AXKDvM_-1JpFw8RPXHvNoJPEhH3sCznqatNMLtnvs",
            },
            {
              id: "jatinangor",
              spreadsheetId: "1k78Cm13WmAB4azNOM-1OpiCUhTvM0lkOAmf1BXQNDpY",
            },
            {
              id: "kiaracondong",
              spreadsheetId: "1rxGcjbHAgLFoXVebYcG4S23GROXDBzTd0ywkGvNPD9s",
            },
            {
              id: "koposayati",
              spreadsheetId: "1a6iPJsK78zzaSHrP5P9fdTyouR7V1Sieoy0NBVjocX0",
            },
            {
              id: "setiabudi",
              spreadsheetId: "1G7NT9Qm8Sf_luiQoqu0wd_-hwh2epBZRs5ELBMKHX6o",
            },
          ],
        },
        {
          id: "jatim1",
          outlet: [
            {
              id: "batu",
              spreadsheetId: "1gYAQ74oXAqmMjpyjy6r6U0cQeRgByDqea9FkGaLp0bI",
            },
            {
              id: "blimbing",
              spreadsheetId: "1qioOspnRMynvI0oi71Wv_gFZgMIvtYptUgWcW05MZwQ",
            },
            {
              id: "bululawang",
              spreadsheetId: "1acMVo66R4cqa1JJVXBLGn8RUjZ_PZK6XMoXmFZn4flQ",
            },
            {
              id: "buring",
              spreadsheetId: "1TMzgyg7vrm4m3-IeLKQhwrtpBA7J8zB_vFt4QH_oVBM",
            },
            {
              id: "dieng",
              spreadsheetId: "1Ondi99X3I-Cw10_GmkUKbH6F9bT0_7XF2pJF-fXh6wc",
            },
            {
              id: "kepanjen",
              spreadsheetId: "1xyXFIooIZX0RisdXtsuJBEysa8R8SPL51RAB9qrqSyk",
            },
            {
              id: "pakis",
              spreadsheetId: "1cfnIjhSV4jBrIQHf6lPJFq2JHq9zljJMFeEs-xuNtrc",
            },
            {
              id: "sawojajar",
              spreadsheetId: "1V6nf_MngtzRHC2YzWCe3MysV5HNnYbtDIEMx870-Z00",
            },
            {
              id: "sigura-gura",
              spreadsheetId: "1Q89mtMHkvH8zicJYUIZjVGTkSX5IUmOi3EOo4RMJS2Y",
            },
            {
              id: "singosari",
              spreadsheetId: "1PIO1SfQU4vFZlreV4OYIBu4b8p06XjbBIm6QK9Oo8T0",
            },
            {
              id: "suhat-new",
              spreadsheetId: "1M7upy6vM0vjT7_cukiI-67h8qLTEpr5CBWAFmplTtKk",
            },
            {
              id: "sukun",
              spreadsheetId: "1Li244ILC75RkP6W8vwq4YO6N-v4NTUaf7Whk9I5jALA",
            },
            {
              id: "sulfat",
              spreadsheetId: "1vWHGwyBfApVn-0ADcAXNJ-6Pr-xC8tleQKfeTA3GCbY",
            },
            {
              id: "trunojoyo",
              spreadsheetId: "1nPpROi9E0nUMUb0x2PtN4GEarD--ScYmoLM0ge470x0",
            },
            {
              id: "turen",
              spreadsheetId: "1KSQTfTDqe8ayxNbav5Ixz9SFUcETSgNyUHHcdL2S7XY",
            },
            {
              id: "um",
              spreadsheetId: "12lFCUnTSUTBFrwrvLuuGVp5CLDhsqs2ee1vqEopG1h4",
            },
            {
              id: "unmuh",
              spreadsheetId: "18c3eALCZqpJUsRQidZWn5iBt47Ngz22f-INhHVUjG2c",
            },
          ],
        },
        {
          id: "jatim2",
          outlet: [
            {
              id: "dharmawangsa",
              spreadsheetId: "1ad10rSbVxCXQ-tSFuu_e-3_OR2uIubBHEFvuUuaKAqg",
            },
            {
              id: "ketintang",
              spreadsheetId: "1fQvVYXc27e-XnkwDWKaJpIWqidLNLy9SEnwev5HYWQE",
            },
            {
              id: "klampis",
              spreadsheetId: "1-NCwskYOgcc0xBS3-D44qIxMEVlvRGU88pAjL6icNBI",
            },
            {
              id: "mulyosari",
              spreadsheetId: "1K969HqGD6yYbj9vMTabm6wLxYbKX-7aq2XbLu_cey9c",
            },
            {
              id: "panjangjiwo",
              spreadsheetId: "1K969HqGD6yYbj9vMTabm6wLxYbKX-7aq2XbLu_cey9c",
            },
            {
              id: "siwalan-kerto",
              spreadsheetId: "1p-LJT4cPYGSw-edSNwo0zv3eJ0LxJ8SMHx4ngfrh-7U",
            },
            {
              id: "tropodo",
              spreadsheetId: "1pSMke3vaHVVtEvBqTcjt8eTURZr_ztOoptWNitc0RsI",
            },
            {
              id: "untag",
              spreadsheetId: "1L1qfhm2kenLqi5TY6DzgOp1MXBmOpewjDXNq_tODF44",
            },
            {
              id: "upn",
              spreadsheetId: "1S2Mmj8Xs_GPoFgf6q4Rhy25HbSw3RtUnLfjaIazMS6Q",
            },
            {
              id: "wijaya-kusuma",
              spreadsheetId: "14R0PDnsN4usNmbs1B9RFywZ3GZCwSN199GnPNPY78v0",
            },
            {
              id: "wiyung",
              spreadsheetId: "1DEi9cwUgAJv3G187qkODT5lWdrZKAPzs_gR7gDHyKk4",
            },
            {
              id: "margorejo",
              spreadsheetId: "1NCA3e6OchqRp62T0dDJmsL2RqKbouQrQ8qeSTZLCt78",
            },
          ],
        },
        {
          id: "jatim3",
          outlet: [
            {
              id: "bali-1-tukad-barito",
              spreadsheetId: "12dW7d5bVkbrLA0UQcCipwH3SLEtboHmxz3UF1A5c1Hk",
            },
            {
              id: "bali-2-dewi-sri",
              spreadsheetId: "1ruWiuo6Yi3DO-2L_IG1CgPxqexnGjybUn-4d6gRuRHY",
            },
            {
              id: "gresik",
              spreadsheetId: "124zwCS9OOskJ2NkTLY7WLDdxsh1RkGZaNJHYVrMHPLE",
            },
            {
              id: "jember-1-mastrip",
              spreadsheetId: "1inKb5xn9jsx-vRXEb_2rMuuSWqQ9Zeylwf_PR8nlEfE",
            },
            {
              id: "jember-2-unej",
              spreadsheetId: "1JTxH4pbeVDJa32nUuoK4NRLtDcmcT6XoKQLPCmHwrKE",
            },
            {
              id: "jombang",
              spreadsheetId: "1qEYi6qrpRyYW7K1FJupuMLhIaq2i2NM_njHN7H0FLy0",
            },
            {
              id: "kediri",
              spreadsheetId: "1IoyWHAKVmQ2r1I_VEw-FpsgYvjYnL3Y4CyJg1balW-Y",
            },
            {
              id: "madiun",
              spreadsheetId: "1is0Q1a-W9FsN5hF-3CZplpv_0X2PQaQdmbLluGSTIM0",
            },
            {
              id: "mojokerto",
              spreadsheetId: "14YEbX93sT2ifxeXbLM1Xhw12DeYpKvsU4TP3QyN3OoE",
            },
            {
              id: "pare",
              spreadsheetId: "1IACFHPhTR3qAG7PLx1cUNQ7UL09gxCtlsTHjzjB3gi0",
            },
            {
              id: "pasuruan",
              spreadsheetId: "1ClGPzgpUoLJGuEhRPVGqkC11MjdicvFJypUFe8WSQNk",
            },
            {
              id: "sidoarjo",
              spreadsheetId: "1targ1BROQy1amCiTg3hbvs_EcFzvG_qIbZ_BeIRhkRk",
            },
            {
              id: "tulungagung",
              spreadsheetId: "1ZeZvhNusuULKov1tn9MZsa32zv5usK89EuS0",
            },
            {
              id: "yogyakarta",
              spreadsheetId: "1qomnAj0auAyyYF-RF5fwGfT4h_KfMpXQDKtcwa_7nJo",
            },
          ],
        },
      ],
    },
  ],

  sheetName: [
    "MASTER BAHAN BAKU",
    "JANUARI",
    "FEBRUARI",
    "MARET",
    "APRIL",
    "MEI",
    "JUNI",
    "JULI",
    "AGUSTUS",
    "SEPTEMBER",
    "OKTOBER",
    "NOVEMBER",
    "DESEMBER",
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
  return titleText.replace(/ /g, "_").toLowerCase();
};

exports.ReadAll = async (req, res) => {
  const schema = Joi.object({
    year: Joi.number().min(2020).max(2021).required(),
    regional: Joi.string().required(),
    outlet: Joi.string().required(),
    sheet: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.params);
  if (error) {
    return resError(res, error.details[0].message, 404);
  }
  const Body = value;
  try {
    const dataYear = DataSet.year.find((e) => e.id == Body.year);
    if (!dataYear) return resError(res, `${Body.year} not found`, 404);

    const dataRegional = dataYear.regional.find((e) => e.id == Body.regional);
    if (!dataRegional) return resError(res, `${Body.regional} not found`, 404);

    const dataOutlet = dataRegional.outlet.find((e) => e.id == Body.outlet);
    if (!dataOutlet) return resError(res, `${Body.outlet} not found`, 404);

    const sheetName = DataSet.sheetName.find((e) => e == Body.sheet);
    if (!sheetName) {
      const dataSheet = DataSet.getSheetName.join(", ");
      return resError(
        res,
        `${Body.sheet} not found ,available : ${dataSheet}`,
        404
      );
    }

    const { spreadsheetId } = dataOutlet;

    // Data SpreadSheet
    const spreadsheetData = await Spreadsheet(spreadsheetId, sheetName);
    // _________________

    let data = [];

    if (sheetName == "MASTER BAHAN BAKU") {
      let header = spreadsheetData[2].map((e) => {
        let text = e.replace(` ${Body.year}`, "");
        text = text.replace(" (ML, PCS, GRAM)", "");
        return titleKey(text);
      });

      for (let i = 3; i < spreadsheetData.length; i++) {
        let i_header = 0;
        let row = {};
        let data_tanggal = [];
        for (let j = 0; j < spreadsheetData[i].length; ) {
          if (j < 7) {
            row[header[i_header]] = spreadsheetData[i][j] || "";
            j++;
            i_header++;
          } else {
            let array = header.slice(7);

            for (let c = 0; c < array.length; c++) {
              data_tanggal.push({
                tanggal: header[i_header],
                value: convertToFloat(spreadsheetData[i][j] || "0.0"),
              });
              j++;
              i_header++;
            }
            console.log(data_tanggal);
            row["data"] = data_tanggal;
          }
        }
        data.push(row);
      }
    } else {
      let header = [];

      let cols = [
        "awal_sudah_dibayar_pcs",
        "awal_belum_dibayar_paket",
        "in_paket",
        "pemakaian_paket",
        "penjualan_paket",
        "waste_pcs",
        "stok_akhir_sudah_dibayar_pcs",
        "drop_stok_paket",
        "stok_bahan_rp",
        "waste_rp",
        "stok_real_paket",
      ];

      spreadsheetData[0].forEach((e) => {
        let text = e.replace(` ${Body.year}`, "");
        text = text.replace(" (ML, PCS, GRAM)", "");
        if (e !== "") {
          header.push(titleKey(text));
        }
      });

      for (let i = 2; i < spreadsheetData.length; i++) {
        let i_header = 0;
        let row = {};
        let data_tanggal = [];
        for (let j = 0; j < spreadsheetData[i].length; j++) {
          if (j < 5) {
            row[header[i_header]] = spreadsheetData[i][j];
            i_header++;
          } else {
            let array = header.slice(5);

            for (let x = 0; x < array.length; x++) {
              let tanggal = {};

              tanggal["tanggal"] = header[i_header];
              for (let c = 0; c < cols.length; c++) {
                tanggal[cols[c]] =
                  convertToFloat(spreadsheetData[i][j]) || "0.0";
                j++;
              }
              i_header++;
              data_tanggal.push(tanggal);
            }
            row["data"] = data_tanggal;
          }
        }
        data.push(row);
      }

      //   return res.json(header);
    }

    return resSuccess(res, `Produksi - Kapten -> ${sheetName}`, data);
  } catch (err) {
    return resError(res, err, 404);
  }
};
