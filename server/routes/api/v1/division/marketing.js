const router = require("express").Router();

const Ketercapaian = require("./../../../../controllers/division/marketing/sales/Ketercapaian");
router.get("/sales/ketercapaian/:sheet/:year/:month", Ketercapaian.ReadAll);

const TrendOmset = require("./../../../../controllers/division/marketing/sales/TrendOmset");
router.get("/sales/trend-omset/:sheet/:year", TrendOmset.ReadAll);

const Lose = require("./../../../../controllers/division/marketing/sales/Lose");
router.get("/sales/lose-sale/:sheet/:year/:month", Lose.ReadAll);

const Potensial = require("./../../../../controllers/division/marketing/sales/Potensial");
router.get("/sales/potensial/:sheet/:year/:month", Potensial.ReadAll);

const Analytics = require("./../../../../controllers/division/marketing/Analytics");
router.get("/Analytics/:sheet/:year", Analytics.ReadAll);

module.exports = router;
