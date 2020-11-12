const router = require("express").Router();

const InvestorManagement = require("./../../../../controllers/division/bisdev/InvestorManagement");
router.get("/investor-management", InvestorManagement.ReadAll);

const OutletProfiles = require("./../../../../controllers/division/bisdev/OutletProfiles");
router.get("/outlet-profiles", OutletProfiles.ReadAll);

module.exports = router;
