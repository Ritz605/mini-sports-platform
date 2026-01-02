require("dotenv").config();
const app = require("./src/app");
const sequelize = require("./src/config/db");

// Load associations BEFORE sync
require("./src/models/Favorite");

const seed = require("./src/seed");

(async () => {
  try {
    await sequelize.sync({ alter: true });

    // 🔥 THIS WAS MISSING
    await seed();

    app.listen(process.env.PORT, () => {
      console.log("🚀 Server running on port", process.env.PORT);
    });
  } catch (error) {
    console.error("❌ Server failed:", error);
  }
})();
