const { resError, resSuccess } = require("./../helpers/HandleResponse");
const { Accounts, Roles, RefreshTokens, ObjectId } = require("./../models");
const { sendForgotPassword } = require("./../config/Nodemailer");
const {
  HashPassword,
  VerifyHashPassword,
  JwtAccessToken,
  JwtRefreshTokenCreate,
  JwtRefreshTokenReplaced,
  SetTokenCookie,
  VerifyRefreshToken,
  RevokeToken,
  JwtResetPasswordToken,
  VerifyResetPasswordToken,
} = require("./../services/Authentication");

exports.register = async (req, res, next) => {
  const body = req.body;
  try {
    const validEmail = await Accounts.findOne({ email: body.email });
    if (validEmail) {
      return resError(res, "Email is already", 404);
    }

    const role = await Roles.findOne({ name: "user" });
    if (!role) {
      return resError(res, "Role not found", 404);
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
      return resError(res, "Register failed", 500);
    }
    const data = {
      email: body.email,
    };
    return resSuccess(res, "Register", data);
  } catch (err) {
    return resError(res, err, 404);
  }
};

exports.login = async (req, res, next) => {
  const body = req.body;

  try {
    const ipAddress = req.ip;

    const account = await Accounts.findOne({ email: body.email });
    if (!account) {
      return resError(res, "Useranme or password is incorrect", 404);
    }
    const passIsValid = await VerifyHashPassword(
      body.password,
      account.password
    );
    if (!passIsValid) {
      return resError(res, "Useranme or password is incorrect", 404);
    }

    const role = await Roles.findById(account.id_role);
    if (!role) {
      return resError(res, "Useranme or password is incorrect", 404);
    }

    const accessToken = await JwtAccessToken(account);
    if (!accessToken) {
      return resError(res, "Token Error", 404);
    }

    const refreshToken = await JwtRefreshTokenCreate(account, ipAddress);
    if (!refreshToken) {
      return resError(res, "Refresh Token Error", 404);
    }

    const setTokenCookie = SetTokenCookie(res, refreshToken);
    const data = {
      email: account.email,
      role: role.name,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    return resSuccess(res, "Login", data);
  } catch (err) {
    return resError(res, err, 404);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const ipAddress = req.ip;
    const authorization = req.header("authorization").split(" ")[1];
    if (!authorization) return resError(res, "Failed authorization", 404);

    const refreshToken = await RefreshTokens.findOne({
      token: authorization,
    });

    if (!refreshToken || !refreshToken.isActive) {
      return resError(res, "Invalid token", 404);
    }

    const decode = await VerifyRefreshToken(refreshToken.token);
    if (!decode) return resError(res, "Invalid token", 404);

    const account = await Accounts.findById(decode.id);
    if (!account) return resError(res, "Failed account not found", 404);

    const role = await Roles.findById(account.id_role);
    if (!role) {
      return resError(res, "Role account not found", 404);
    }

    const newRefreshToken = await JwtRefreshTokenReplaced(
      account,
      ipAddress,
      refreshToken
    );
    if (!newRefreshToken) {
      return resError(res, "Refresh Token Error", 404);
    }

    const newAccessToken = await JwtAccessToken(account);
    if (!newAccessToken) {
      return resError(res, "Token Error", 404);
    }

    const setTokenCookie = SetTokenCookie(res, newRefreshToken);

    const data = {
      email: account.email,
      role: role.name,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
    return resSuccess(res, "Refresh Token", data);
  } catch (err) {
    return resError(res, err, 404);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const ipAddress = req.ip;
    const authorization = req.header("authorization").split(" ")[1];
    if (!authorization) return resError(res, "Failed authorization", 404);

    const refreshToken = await RefreshTokens.findOne({
      token: authorization,
    });
    if (!refreshToken || !refreshToken.isActive) {
      return resError(res, "Invalid token", 404);
    }

    const revokeToken = await RevokeToken(ipAddress, refreshToken);
    if (!revokeToken) return resError(res, "Invalid revoke token", 404);

    return resSuccess(res, "Revoke token");
  } catch (err) {
    return resError(res, err, 404);
  }
};

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const account = await Accounts.findOne({ email });
    if (!account) {
      return resError(res, "Account with this email does not exists.", 404);
    }
    const token = await JwtResetPasswordToken(account);
    if (!token) {
      return resError(res, "Token failed", 404);
    }
    const sendEmail = await sendForgotPassword("alpinnz@gmail.com", token);
    if (!sendEmail) {
      return resError(res, "Send token error", 404);
    }

    const update = await account.updateOne({ resetLink: token });
    if (!update) {
      return resError(res, "Reset password link error", 404);
    }
  } catch (err) {
    return resError(res, err, 404);
  }
  return resSuccess(res, "Email has been sent, follow the intructions");
};

exports.getResetPassword = async (req, res, next) => {
  const { token } = req.params;
  try {
    const decode = await VerifyResetPasswordToken(token);
    if (!decode) return resError(res, "Invalid token", 404);

    const account = await Accounts.findOne({
      _id: ObjectId(decode.id),
      resetLink: token,
    });
    if (!account) return resError(res, "Failed account not found", 404);

    return res.type(".html").send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />

    <!-- Bootstrap CSS -->
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
      crossorigin="anonymous"
    />

    <title>Reset Password</title>
  </head>

  <body>
    <div class="container mt-5">
      <div class="row">
        <div class="col-sm-6 offset-sm-3">
          <h4>Reset password</h4>
          <form
            method="POST"
            action="/authentication/reset-password/${token}"  
          >
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                class="form-control"
                name="password"
                id="password"
              />
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script
      src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
      integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
      integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
      integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
      crossorigin="anonymous"
    ></script>
  </body>
</html>
`);
  } catch (err) {
    return res.send(err);
  }
};

exports.postResetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decode = await VerifyResetPasswordToken(token);
    if (!decode) return resError(res, "Invalid token", 404);

    const account = await Accounts.findOne({
      _id: ObjectId(decode.id),
      resetLink: token,
    });
    if (!account) return resError(res, "Failed account not found", 404);

    const hashPassword = await HashPassword(password);

    const update = await account.updateOne({
      resetLink: "",
      password: hashPassword,
    });
    if (!update) return resError(res, "Reset password error", 404);
    return res.type(".html").send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />

    <!-- Bootstrap CSS -->
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
      crossorigin="anonymous"
    />

    <title>Reset Password</title>
  </head>

  <body>
    <div class="container mt-5">
      <div class="row">
        <div class="col-sm-6 offset-sm-3">
          <h4>Reset password Success</h4>
          <h6>silahkan login</h6>
        </div>
      </div>
    </div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script
      src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
      integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
      integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
      integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
      crossorigin="anonymous"
    ></script>
  </body>
</html>
`);
  } catch (err) {
    return res.send(err);
  }
};

exports.activate = async (req, res, next) => {
  return resSuccess(res, "Activate");
};
