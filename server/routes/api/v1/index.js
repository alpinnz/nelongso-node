const router = require("express").Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  res.send("/api/v1");
});

const division = require("./division");
router.use("/division", division);

const roles = require("./roles");
router.use("/roles", roles);

const accounts = require("./accounts");
router.use("/accounts", accounts);

module.exports = router;
