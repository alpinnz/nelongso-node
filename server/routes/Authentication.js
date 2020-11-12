const router = require("express").Router();
const { RegisterValid, LoginValid } = require("./../validations/Accounts");
const {
  activate,
  forgotPassword,
  getResetPassword,
  login,
  logout,
  postResetPassword,
  refreshToken,
  register,
} = require("./../controllers/Authentication");

router.post("/register", RegisterValid, register);

router.post("/login", LoginValid, login);

router.post("/refresh-token", refreshToken);

router.post("/logout", logout);

router.put("/forgot-password", forgotPassword);

router.get("/reset-password/:token", getResetPassword);

router.post("/reset-password/:token", postResetPassword);

router.get("/activate/:token", activate);

module.exports = router;
