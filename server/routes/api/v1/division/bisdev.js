const router = require("express").Router();

const InvestorManagement = require("./../../../../controllers/division/bisdev/InvestorManagement");
router.get("/investor-management/:year", InvestorManagement.ReadAll);

const OutletProfiles = require("./../../../../controllers/division/bisdev/OutletProfiles");
router.get("/outlet-profiles/:year", OutletProfiles.ReadAll);

module.exports = router;
