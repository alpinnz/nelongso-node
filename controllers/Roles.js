const { Roles } = require("./../models");

exports.ReadAll = async (req, res) => {
  const roles = await Roles.find();
  return res.json(roles);
};

exports.Remove = async (req, res) => {
  const roles = await Roles.remove();
  return res.json(roles);
};
