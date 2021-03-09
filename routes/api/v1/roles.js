const router = require("express").Router();
const Roles = require("./../../../controllers/Roles");

/* GET home page. */
router.get("/", Roles.ReadAll);

/* GET home page. */
// router.delete("/", Roles.Remove);

module.exports = router;
