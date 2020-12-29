const router = require("express").Router();

const Kapten = require("./../../../../controllers/division/produksi/logistics/kapten");
router.get("/logistics/kapten/:regional/:outlet/:sheet/:year", Kapten.ReadAll);

module.exports = router;
