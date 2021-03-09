const router = require("express").Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  res.send("/api/v1/division");
});

const bisdev = require("./bisdev");
router.use("/bisdev", bisdev);

const keuangan = require("./keuangan");
router.use("/keuangan", keuangan);

const marketing = require("./marketing");
router.use("/marketing", marketing);

const operasional = require("./operasional");
router.use("/operasional", operasional);

const produksi = require("./produksi");
router.use("/produksi", produksi);

module.exports = router;
