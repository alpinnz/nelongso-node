const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("./config/Mongoose");
const routes = require("./routes");
const multer = require("multer");
const cors = require("cors");
const upload = multer();
const debug = require("debug")("server:Nelongso");
const http = require("http");

require("dotenv").config();

const app = express();

// connect database mongoose
mongoose.connect();
// for log debug
app.use(logger("dev"));
// for parsing application/json
app.use(express.json());
//
app.use(cors());
// for parsing application/xwww-
app.use(express.urlencoded({ extended: true }));
// for parsing cookie
app.use(cookieParser());
// for parsing multipart/form-data
app.use(upload.array());
// for files static public
app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/", routes);

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);

    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);

    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || 3000);
console.log("port", port);
app.set("port", port);

const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
