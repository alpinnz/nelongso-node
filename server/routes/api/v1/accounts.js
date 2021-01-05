const router = require("express").Router();
const Accounts = require("./../../../controllers/Accounts");

router.get("/", Accounts.ReadAll);

router.get("/:_id", Accounts.ReadOne);

router.post("/", Accounts.Create);

router.patch("/:_id", Accounts.Update);

router.delete("/:_id", Accounts.Remove);

module.exports = router;
