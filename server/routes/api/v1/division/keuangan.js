const router = require("express").Router();
const {
  Index,
  OutletProfiles,
  FinanceAnalytics,
  GeneralDashboardKeuanganNonCash,
  GeneralDashboardKeuanganRegional,
  GeneralScoreBoardAllRegional,
} = require("./../../../../controllers/division/Keuangan");

/* GET home page. */
router.get("/", Index);
router.post("/general-dashboard-regional", GeneralDashboardKeuanganRegional);
router.post("/general-dashboard-non-cash", GeneralDashboardKeuanganNonCash);
router.post("/general-scoreboard-all-regional", GeneralScoreBoardAllRegional);
router.post("/finance-analytics", FinanceAnalytics);
router.post("/outlet-profiles", OutletProfiles);

module.exports = router;
