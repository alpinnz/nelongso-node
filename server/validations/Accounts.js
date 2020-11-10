const Joi = require("joi");
const HandleResponse = require("./../helpers/HandleResponse");
const { Accounts, Roles, RefreshTokens, ObjectId } = require("./../models");

exports.RegisterValid = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    repeat_password: Joi.string().valid(Joi.ref("password")).required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return res
      .status(404)
      .json(HandleResponse.Error(error.details[0].message, 404));
  }

  req.body = value;
  next();
};

exports.LoginValid = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return res
      .status(404)
      .json(HandleResponse.Error(error.details[0].message, 404));
  }

  req.body = value;
  next();
};

exports.TokenValid = async (req, res, next) => {
  const schema = Joi.object({
    token: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return res
      .status(404)
      .json(HandleResponse.Error(error.details[0].message, 404));
  }

  req.body = value;
  next();
};

exports.UsernameValidate = async (req, res, next) => {
  try {
    const username = await Accounts.findOne({
      username: req.body.username,
    });
    if (username) {
      return res
        .status(404)
        .json(HandleResponse.Error("Username is already", 404));
    }
    next();
  } catch (err) {
    return res.status(404).json(HandleResponse.Error(err, 404));
  }
};

exports.EmailValidate = async (req, res, next) => {
  try {
    const email = await Accounts.findOne({ email: body.email });
    if (email) {
      return res
        .status(404)
        .json(HandleResponse.Error("Email is already", 404));
    }
    next();
  } catch (err) {
    return res.status(404).json(HandleResponse.Error(err, 404));
  }
};
