const mongoose = require("./../config/Mongoose");
exports.ObjectId = (string) => {
  return mongoose.ObjectId(string);
};
exports.Accounts = require("./Accounts");
exports.Customers = require("./Customers");
exports.RefreshTokens = require("./RefreshTokens");
exports.Roles = require("./Roles");
