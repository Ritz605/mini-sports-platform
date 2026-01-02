const router = require("express").Router();
const { getMatches } = require("../controllers/match.controller");
const auth = require("../middleware/auth.middleware");

router.get("/", auth, getMatches);

module.exports = router;
