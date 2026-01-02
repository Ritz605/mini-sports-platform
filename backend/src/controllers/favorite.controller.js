// controllers/favorite.controller.js
const User = require("../models/User");
const Match = require("../models/Match");

exports.addFavorite = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await Match.findByPk(req.params.matchId);
    if (!match) return res.status(404).json({ message: "Match not found" });

    // Add to favorites (Sequelize many-to-many)
    await user.addMatch(match);
    res.json({ message: "Added to favorites" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add favorite" });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const offset = (page - 1) * limit;

    const user = await User.findByPk(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Get favorite matches with pagination
    const favoriteMatches = await user.getMatches({ limit, offset });
    const totalCount = await user.countMatches(); // Total favorites for pagination

    res.json({
      data: favoriteMatches,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch favorites" });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await Match.findByPk(req.params.matchId);
    if (!match) return res.status(404).json({ message: "Match not found" });

    await user.removeMatch(match);
    res.json({ message: "Removed from favorites" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to remove favorite" });
  }
};
