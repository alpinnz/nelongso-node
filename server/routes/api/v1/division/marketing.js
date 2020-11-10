const router = require("express").Router();
const Ketercapaian = require("./../../../../controllers/division/marketing/sales/Ketercapaian");
const TrendOmset = require("./../../../../controllers/division/marketing/sales/TrendOmset");
const Potensial = require("./../../../../controllers/division/marketing/sales/Potensial");
const Analytics = require("./../../../../controllers/division/marketing/Analytics");

router.get("/sales/ketercapaian/:sheet/:year/:month", Ketercapaian.ReadAll);
router.get("/sales/trend-omset/:sheet/:year", TrendOmset.ReadAll);
router.get("/sales/potensial/:sheet/:year/:month", Potensial.ReadAll);
router.get("/analytics/:sheet/:year", Analytics.ReadAll);

module.exports = router;
