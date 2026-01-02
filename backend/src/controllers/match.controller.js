

const { Op } = require("sequelize");
const Match = require("../models/Match");

exports.getMatches = async (req, res) => {
  try {
    let { sport, search, page, limit } = req.query;

    // ✅ SANITIZE PAGINATION
    page = Math.max(parseInt(page) || 1, 1);
    limit = Math.max(parseInt(limit) || 6, 1);

    const offset = (page - 1) * limit;

    const where = {};

    if (sport && sport !== "All") {
      where.sport = sport;
    }

    if (search) {
      where[Op.or] = [
        { teams: { [Op.iLike]: `%${search}%` } },
        { league: { [Op.iLike]: `%${search}%` } },
        { sport: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const { rows, count } = await Match.findAndCountAll({
      where,
      limit,
      offset,
      order: [["startTime", "ASC"]],
    });

    res.json({
      data: rows,
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
    });
  } catch (err) {
    console.error("MATCH FETCH ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
