const { resError, resSuccess } = require("./../../../helpers/HandleResponse");
const { Spreadsheet } = require("./../../../config/Spreadsheet");
const Joi = require("joi");

const DataSet = {
  getSpreadsheets: [
    {
      year: 2020,
      spreadsheetId: "1Exk3zOBiK6EW6gaNV4vPFCSiT9q_ih1MHavkLtgh0kk",
    },
  ],
  getSheetName: ["JATIM 1", "JATIM 2", "JATIM 3", "JABAR"],
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
        id: `${id || ""}`,
        jenis_kegiatan: `${e[0] || ""}`,
        pic: `${e[1] || ""}`,
        tanggal_audit: `${e[2] || ""}`,
        bulan_audit: `${e[3] || ""}`,
        outlet: `${e[4] || ""}`,
        temuan: {
          jenis_barang: `${e[5] || ""}`,
          standar_outlet: `${e[6] || ""}`,
          crosscheck_outlet: `${e[7] || ""}`,
          jenis_temuan: `${e[8] || ""}`,
          label: `${e[9] || ""}`,
        },

        bentuk_eksekusi: `${e[10] || ""}`,
        tanggal_eksekusi: `${e[11] || ""}`,
        selisih: `${e[12] || ""}`,
        eksekusi: `${e[13] || ""}`,
        surat_service: `${e[14] || ""}`,
        keterangan: `${e[15] || ""}`,
      };
      if (i > 8) {
        data.push(row);
        id++;
      }
    });

    return resSuccess(res, `Operasional -> ${sheetName}`, data);
  } catch (err) {
    return resError(res, err, 200);
  }
};
