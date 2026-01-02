const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const {
  addFavorite,
  getFavorites,
  removeFavorite,
} = require("../controllers/favorite.controller");

router.post("/:matchId", auth, addFavorite);
router.delete("/:matchId", auth, removeFavorite); 
router.get("/", auth, getFavorites);

module.exports = router;
