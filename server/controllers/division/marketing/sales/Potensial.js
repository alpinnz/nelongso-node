const Joi = require("joi");
const {
  resError,
  resSuccess,
} = require("./../../../../helpers/HandleResponse");
const { Spreadsheet } = require("./../../../../config/Spreadsheet");
const { json } = require("body-parser");

const DataSet = {
  year: [
    {
      id: 2020,
      month: [
        {
          id: 1,
          spreadsheetId: "1Np0_wUEMw4A6uYB87uJWmgJeqmvVow9UmQ3bBhL1ZCI",
        },
        {
          id: 2,
          spreadsheetId: "14_83lrG6ju3AF5CAXElhm8smGqG_S3IvpJQ7pax4ct0",
        },
        {
          id: 3,
          spreadsheetId: "1ITpOLsOcvkHn-Do3X137WbVxQTDTquy4RIlgfj0zN78",
        },
        {
          id: 4,
          spreadsheetId: "1XHGEFqhds5KhewZ4zIQFHvPqr6zcnHEnPcW4tcGCjj0",
        },
        {
          id: 5,
          spreadsheetId: "1aMmtQ4IkSkyYIjssx8nN-Vxc7r72BF-BphtjcEFM8CA",
        },
        {
          id: 6,
          spreadsheetId: "15utH1jD9eI4RKiAALNknSbTdao4id5i9713x_5pvZ7w",
        },
        {
          id: 7,
          spreadsheetId: "1V3E1d4cNhHIOEoYDF9vSzcdttDKtmv-8ZC-i32Pe6xg",
        },
        {
          id: 8,
          spreadsheetId: "1kMkGdhSBCfScgUXqMAmM5B3NYatZtPZKRiIaitD2otU",
        },
        {
          id: 9,
          spreadsheetId: "19SZn-nnWtQVAq8nIZfYUIBdZycL90N6iR2Mo6fZzcJ8",
        },
        {
          id: 10,
          spreadsheetId: "1FLKnkYsefLZnQI2zRujYJcdqepz91Tbu1FYd9U7E-K8",
        },
        {
          id: 11,
          spreadsheetId: "1i7OxDIrSTuABviAPR-ulXj3pKb48CRkTIeyG555HvIc",
        },
        {
          id: 12,
          spreadsheetId: "1Av-hMJG60XqfA-FjUT9-mYeZ0o-0m_9kxjto0FZiJJ4",
        },
      ],
    },
    {
      id: 2021,
      month: [
        {
          id: 1,
          spreadsheetId: "1JLRZjvils54GR3N36T6pz7Mp7Ae5qOc3hqn1Z5r_XEE",
        },
        {
          id: 2,
          spreadsheetId: "15e_xZnuND1EM5wqvuDtfQd6_ezmlpUGu36Mc8Fclp-8",
        },
        {
          id: 3,
          spreadsheetId: "1Rbn1_a9S07GuRFTFvkPXWzObWDS7Db5iOenMUYXUn3E",
        },
        {
          id: 4,
          spreadsheetId: "1S6FzDLJs_vEl0Q1NPD_va3_gUNpAopVc1AtP8j5bSpw",
        },
        {
          id: 5,
          spreadsheetId: "1Z4ge5uGBJDdj_0OTlODSjo079oD_TQ0dU-o4jxtOHL0",
        },
        {
          id: 6,
          spreadsheetId: "10B4kL-1dlR-ynWHb09YCPVW2A-Xch37MTu4VeR7pI-s",
        },
        {
          id: 7,
          spreadsheetId: "18g5ybQ2vOAM9WoXhmr72gEuzkCitZjF-79JOQZcmUR0",
        },
        {
          id: 8,
          spreadsheetId: "1cK5Nh0fKBxPnn940G2ysF8DpB-afW1X6Zf_bJLQ-8qs",
        },
        {
          id: 9,
          spreadsheetId: "1duyLjygeqViCVFzTB52UN-KTr1JMsPubODpE1qEWfrU",
        },
        {
          id: 10,
          spreadsheetId: "1gBF1d1YGsTJ_-eaKilHRuLD0VrkPyVYsj2ftzZxKwfM",
        },
        {
          id: 11,
          spreadsheetId: "1J4TqPO_TAbR8u6hgMMqmx-E4_ORxVuDkS7Y2PpNbRfY",
        },
        {
          id: 12,
          spreadsheetId: "1Ni0uM3VCDlRvKtQb5MmRGROWYd4-ZT6JNpq3qAL1v6M",
        },
      ],
    },
  ],
  sheetName: ["JABAR", "JATIM 1", "JATIM 2", "JATIM 3"],
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
    month: Joi.number().min(1).max(12).required(),
  });

  const { error, value } = schema.validate(req.params);
  if (error) {
    return resError(res, error.details[0].message, 200);
  }
  const Body = value;
  try {
    const dataYear = DataSet.year.find((e) => e.id == Body.year);
    if (!dataYear) return resError(res, `${Body.year} not found`, 200);
    const dataMonth = dataYear.month.find((e) => e.id == Body.month);
    if (!dataMonth) return resError(res, `${Body.month} not found`, 200);
    const sheetName = DataSet.sheetName.find((e) => e == Body.sheet);

    if (!sheetName) {
      const dataSheet = DataSet.sheetName.join(", ");
      return resError(
        res,
        `${Body.sheet} not found ,available : ${dataSheet}`,
        200
      );
    }

    const { spreadsheetId } = dataMonth;
    // Data SpreadSheet
    const spreadsheetData = await Spreadsheet(spreadsheetId, sheetName);
    if (!spreadsheetData) {
      return resError(res, `spreadsheetData not found`, 200);
    }

    // _________________

    let data = [];

    let outlets = [];
    spreadsheetData[4].forEach((e, i) => {
      if (i > 0 && e != null && e != "") {
        outlets.push(e);
      }
    });

    const columns = ["omzet", "lose_sale", "potensial_omzet"];

    const lineHeader = 5;
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
            if (title === "nama") {
              valueColumns[item] = `${e[index]}`.toLowerCase() || "";
            } else {
              valueColumns[item] = convertToFloat(e[index]) || "0.0";
            }
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
        // res["data"]["id"] = data[i]["tanggal"];
        temp_data[index]["data"].push({
          id: data[i]["tanggal"],
          supplier: res["data"],
        });
      }
    }

    data = temp_data;

    return resSuccess(res, `marketing -> admin -> ${sheetName}`, data);
  } catch (err) {
    return resError(res, err, 200);
  }
};
