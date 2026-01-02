const seedMatches = require("./seedMatches");
const Match = require("../models/Match");

module.exports = async () => {
  const count = await Match.count();

  if (count === 0) {
    await seedMatches();
    console.log("✅ Matches seeded");
  } else {
    console.log("ℹ️ Matches already exist, skipping seed");
  }
};
