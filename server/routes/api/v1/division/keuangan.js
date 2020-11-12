const router = require("express").Router();

const Analytics = require("./../../../../controllers/division/keuangan/Analytics");
router.get("/analytics/:sheet/:year", Analytics.ReadAll);

const OutletProfiles = require("./../../../../controllers/division/keuangan/OutletProfiles");
router.get("/outlet-profiles", OutletProfiles.ReadAll);

const ScoreAllRegional = require("./../../../../controllers/division/keuangan/general/ScoreAllRegional");
router.get(
  "/general/score-all-regional/:sheet/:year/:month",
  ScoreAllRegional.ReadAll
);

const DashboardNonCash = require("./../../../../controllers/division/keuangan/general/DashboardNonCash");
router.get(
  "/general/dashboard-non-cash/:sheet/:year/:month",
  DashboardNonCash.ReadAll
);

const DashboardRegional = require("./../../../../controllers/division/keuangan/general/DashboardRegional");
router.get(
  "/general/dashboard-regional/:regional/:sheet/:year/:month",
  DashboardRegional.ReadAll
);

module.exports = router;
