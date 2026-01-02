// models/Favorite.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Match = require("./Match");

const Favorite = sequelize.define("Favorite", {});

User.belongsToMany(Match, { through: Favorite });
Match.belongsToMany(User, { through: Favorite });

module.exports = Favorite;
