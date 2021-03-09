const router = require("express").Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  res.send("index");
});

const Authentication = require("./Authentication");
router.use("/Authentication", Authentication);

const api = require("./api");
router.use("/api", api);

module.exports = router;
