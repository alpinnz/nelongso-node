const { resError, resSuccess } = require("./../helpers/HandleResponse");
const { Accounts, Roles } = require("./../models");
const { HashPassword } = require("./../services/Authentication");
const Joi = require("joi");

exports.ReadAll = async (req, res) => {
  const accounts = await Accounts.find().populate("id_role");
  return res.json(accounts);
};

exports.ReadOne = async (req, res) => {
  const _id = req.params._id;
  const accounts = await Accounts.findById(_id).populate("id_role");
  return res.json(accounts);
};

exports.Create = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    id_role: Joi.string().required(),
    password: Joi.string().required(),
    repeat_password: Joi.string().valid(Joi.ref("password")).required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return resError(res, error.details[0].message, 200);
  }
  const body = value;
  try {
    const validEmail = await Accounts.findOne({ email: body.email });
    if (validEmail) {
      return resError(res, "Email is already", 200);
    }

    const role = await Roles.findById(body.id_role);
    if (!role) {
      return resError(res, "Role not found", 200);
    }
    const hashPassword = await HashPassword(body.password);

    const newAccount = {
      username: body.username,
      email: body.email,
      password: hashPassword,
      id_role: role._id,
    };

    const account = await Accounts.create(newAccount);
    if (!account) {
      return resError(res, "Create failed", 500);
    }
    const data = {
      email: body.email,
      role: role.name,
    };
    return resSuccess(res, "Create", data);
  } catch (err) {
    return resError(res, err, 200);
  }
};

exports.Update = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    id_role: Joi.string().required(),
    password: Joi.string().required(),
    repeat_password: Joi.string().valid(Joi.ref("password")).required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return resError(res, error.details[0].message, 200);
  }
  const body = value;
  try {
    const _id = req.params._id;
    const accounts = await Accounts.findById(_id);
    if (!accounts) {
      return resError(res, "Account not found", 200);
    }
    //
    const validEmail = await Accounts.findOne({ email: body.email });
    if (validEmail && _id !== validEmail._id) {
      return resError(res, "Email is already", 200);
    }

    const role = await Roles.findById(body.id_role);
    if (!role) {
      return resError(res, "Role not found", 200);
    }
    const hashPassword = await HashPassword(body.password);

    accounts.username = body.username;
    accounts.email = body.email;
    accounts.password = hashPassword;
    accounts.id_role = role._id;

    const newAccount = await Accounts.findByIdAndUpdate(_id, accounts);
    if (!newAccount) {
      return resError(res, "Create failed", 500);
    }
    const data = {
      email: body.email,
      role: role.name,
    };
    return resSuccess(res, "Create", data);
  } catch (err) {
    return resError(res, err, 200);
  }
};

exports.Remove = async (req, res) => {
  const _id = req.params._id;
  const accounts = await Accounts.findByIdAndDelete(_id);
  return res.json(accounts);
};
