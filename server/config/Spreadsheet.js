const { google } = require("googleapis");

const Authentication = async () => {
  try {
    const client = new google.auth.JWT(
      process.env.CLIENT_EMAIL,
      null,
      process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
      [process.env.SCOPE_READONLY]
    );

    const tokens = await client.authorize();
    return client;
  } catch (err) {
    return null;
  }
};

const SpreadsheetFetch = async (_id, _range, _authentication) => {
  const option = {
    spreadsheetId: _id,
    range: _range,
    prettyPrint: true,
  };
  try {
    const sheets = await google.sheets({
      version: "v4",
      auth: _authentication,
    });
    const res = await sheets.spreadsheets.values.get(option);
    const rows = res.data.values;
    return rows;
  } catch (err) {
    return null;
  }
};

exports.Spreadsheet = async (_id, _range) => {
  const authentication = await Authentication();
  if (!authentication) return null;
  const Rows = await SpreadsheetFetch(_id, _range, authentication);
  // console.log(Rows);
  // const result = await Rows.filter((item) => item.length > 0);

  return Rows;
};
