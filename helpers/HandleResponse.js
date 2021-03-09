const Response = (name, message, code, status, data) => {
  return {
    name: `${name}`,
    message: `${message}`,
    code: code,
    status: status,
    data: data,
  };
};

exports.Success = (message, data) => {
  return Response("Success", `${message} success`, 0, 200, data);
};

exports.resSuccess = (res, message, data) => {
  return res
    .status(200)
    .json(Response("Success", `${message} success`, 0, 200, data));
};

exports.Error = (message, port) => {
  return Response(`Error`, `${message}`, 0, port);
};

exports.resError = (res, message, port) => {
  return res.status(port).json(Response(`Error`, `${message}`, 0, port));
};
