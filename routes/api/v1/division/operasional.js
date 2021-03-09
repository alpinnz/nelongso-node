const router = require("express").Router();

const Training = require("./../../../../controllers/division/operasional/training");
router.get("/training/:sheet/:year", Training.ReadAll);

const Maintance = require("./../../../../controllers/division/operasional/maintance");
router.get("/maintance/:sheet/:year", Maintance.ReadAll);

const Penilaian = require("./../../../../controllers/division/operasional/general/penilaian");
router.get("/general/penilaian/:sheet/:year", Penilaian.ReadAll);

const Inventaris = require("./../../../../controllers/division/operasional/general/inventaris");
router.get("/general/inventaris/:sheet/:year", Inventaris.ReadAll);

const Analytics = require("./../../../../controllers/division/operasional/analytics");
router.get("/analytics/:sheet/:year", Analytics.ReadAll);

module.exports = router;
