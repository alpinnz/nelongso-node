const router = require("express").Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  res.send("/api");
});

const v1 = require("./v1");
router.use("/v1", v1);

module.exports = router;
