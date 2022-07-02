const router = require("express").Router();

const Quentions = require("./questions");
router.get("/questions", Quentions);

module.exports = router;