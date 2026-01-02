const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const matchRoutes = require("./routes/match.routes")
const favoriteRoutes = require("./routes/favorite.routes")
const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true
}));

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/matches", matchRoutes);
app.use("/favorites", favoriteRoutes);

module.exports = app;
