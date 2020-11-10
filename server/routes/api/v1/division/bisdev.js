const router = require("express").Router();
const {
  Index,
  InvestorManagement,
  OutletProfiles,
} = require("./../../../../controllers/division/Bisdev");

/* GET home page. */
router.get("/", Index);

router.post("/investor-management", InvestorManagement);

router.post("/outlet-profiles", OutletProfiles);

module.exports = router;
