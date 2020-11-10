var outlets = [
  "bekasi",
  "depok",
  "jatinangor",
  "kiaracondong",
  "koposayati",
  "setia budi",
  "batu",
  "blimbing",
  "bululawang",
  "buring",
  "dieng",
  "kepanjen",
  "pakis",
  "sawojajar",
  "sigura-gura",
  "singosari",
  "suhat_new",
  "sukun",
  "sulfat",
  "trunojoyo",
  "turen",
  "um",
  "unmuh",
  "dharmawangsa",
  "ketintang",
  "klampis",
  "mulyosari",
  "panjang_jiwo",
  "siwalan_kerto",
  "tropodo",
  "utang",
  "upn",
  "wijaya_kusuma",
  "wiyung",
  "bali_1_tukad_barito",
  "bali_2_dewi_sari",
  "gresik",
  "jember_1_mastrip",
  "jember_2_unej",
  "jombang",
  "kediri",
  "madiun",
  "mojokerto",
  "pare",
  "pasuruan",
  "sidoarjo",
  "tulungagung",
  "yogyakarta",
];

exports.GORESTO = async (data) => {
  var rows = [];
  const header_line = 5;
  outlets.push("total");

  data.forEach((e, index) => {
    if (index > header_line) {
      const columns = ["grab", "rekening", "selisih"];

      let cols = {};
      let i_column = 0;

      const outletXcolums = outlets.length * columns.length;
      const length = outletXcolums + 1;
      if (e.length != length) {
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

      rows.push(cols);
    }
  });
  return rows;
};

exports.GRABRESTO = async (data) => {
  var rows = [];
  const header_line = 5;
  outlets.push("total");

  data.forEach((e, index) => {
    if (index > header_line) {
      const columns = ["ovo", "rekening", "selisih"];

      let cols = {};
      let i_column = 0;

      const outletXcolums = outlets.length * columns.length;
      const length = outletXcolums + 1;
      if (e.length != length) {
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

      rows.push(cols);
    }
  });
  return rows;
};

exports.GOJEK_AND_GRAB = async (data) => {
  var rows = [];
  const header_line = 6;

  data.forEach((e, index) => {
    if (index > header_line) {
      const columns = [
        "gopay",
        "ovo",
        "uang_fisik",
        "nb",
        "total_suplyer",
        "setoran_bersih",
        "ppn",
        "koreksi",
        "total_uang_non_cash",
      ];

      let cols = {};
      let i_column = 0;

      const outletXcolums = outlets.length * columns.length;
      const length = outletXcolums + 1;
      if (e.length != length) {
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

      rows.push(cols);
    }
  });
  return rows;
};

exports.SALDO_GORESTO = async (data) => {
  var rows = [];
  const header_line = 0;

  let row = {};
  let i_row = 0;
  let net_i_row = 4;

  let ket_col = {};

  let i_ket = 0;
  const ket = [
    "sisal_saldo_bulan",
    "go_resto_all",
    "transfer_pihak",
    "sisa_saldo",
  ];
  const columns = ["debet", "kredit", "saldo"];
  data.forEach((e) => {
    const req_col = 5;
    if (e.length <= req_col) {
      const net_col = e.length - req_col;
      for (let index = 0; index < net_col; index++) {
        e.push("");
      }
    }
    for (let i = 0; i < e.length; i++) {
      if (i_row == 0 && i == 0) {
        row["tanggal"] = e[i];
      }
      if (i == 2) {
        let cols = {};
        columns.forEach((column) => {
          cols[column] = e[i] || "";
          i++;
        });
        ket_col[ket[i_ket]] = cols;
        i_ket++;
        console.log(cols);
        console.log(ket_col);
      }
    }
    if (i_row == net_i_row - 1) {
      row["keterangan"] = ket_col;
      rows.push(row);
      i_row = 0;
      i_ket = 0;
    } else {
      i_row++;
    }
  });
  return rows;
};

exports.SALDO_GRABRESTO = async (data) => {
  var rows = [];
  const header_line = 0;

  let row = {};
  let i_row = 0;
  let net_i_row = 4;

  let ket_col = {};

  let i_ket = 0;
  const ket = [
    "sisal_saldo_bulan",
    "go_resto_all",
    "transfer_pihak",
    "sisa_saldo",
  ];
  const columns = ["debet", "kredit", "saldo"];
  data.forEach((e) => {
    const req_col = 5;
    if (e.length <= req_col) {
      const net_col = e.length - req_col;
      for (let index = 0; index < net_col; index++) {
        e.push("");
      }
    }
    for (let i = 0; i < e.length; i++) {
      if (i_row == 0 && i == 0) {
        row["tanggal"] = e[i];
      }
      if (i == 2) {
        let cols = {};
        columns.forEach((column) => {
          cols[column] = e[i] || "";
          i++;
        });
        ket_col[ket[i_ket]] = cols;
        i_ket++;
        console.log(cols);
        console.log(ket_col);
      }
    }
    if (i_row == net_i_row - 1) {
      row["keterangan"] = ket_col;
      rows.push(row);
      i_row = 0;
      i_ket = 0;
    } else {
      i_row++;
    }
  });
  return rows;
};
