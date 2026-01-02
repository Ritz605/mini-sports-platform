// models/Match.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Match = sequelize.define("Match", {
  sport: DataTypes.STRING,
  league: DataTypes.STRING,
  teams: DataTypes.STRING,
  startTime: DataTypes.DATE,
});

module.exports = Match;
