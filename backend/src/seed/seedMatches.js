const Match = require("../models/Match");

module.exports = async () => {
  await Match.bulkCreate([
    // ================= CRICKET =================
    {
      sport: "Cricket",
      league: "IPL",
      teams: "MI vs CSK",
      startTime: new Date("2026-01-05T19:30:00"),
    },
    {
      sport: "Cricket",
      league: "IPL",
      teams: "RCB vs KKR",
      startTime: new Date("2026-01-06T19:30:00"),
    },
    {
      sport: "Cricket",
      league: "IPL",
      teams: "GT vs RR",
      startTime: new Date("2026-01-07T19:30:00"),
    },
    {
      sport: "Cricket",
      league: "IPL",
      teams: "LSG vs DC",
      startTime: new Date("2026-01-08T19:30:00"),
    },
    {
      sport: "Cricket",
      league: "Big Bash",
      teams: "Sydney Sixers vs Melbourne Stars",
      startTime: new Date("2026-01-08T16:00:00"),
    },
    {
      sport: "Cricket",
      league: "Big Bash",
      teams: "Perth Scorchers vs Brisbane Heat",
      startTime: new Date("2026-01-09T16:00:00"),
    },
    {
      sport: "Cricket",
      league: "International",
      teams: "India vs Australia",
      startTime: new Date("2026-01-10T13:30:00"),
    },
    {
      sport: "Cricket",
      league: "International",
      teams: "England vs South Africa",
      startTime: new Date("2026-01-11T13:30:00"),
    },

    // ================= FOOTBALL =================
    {
      sport: "Football",
      league: "EPL",
      teams: "Arsenal vs Chelsea",
      startTime: new Date("2026-01-05T22:00:00"),
    },
    {
      sport: "Football",
      league: "EPL",
      teams: "Man City vs Liverpool",
      startTime: new Date("2026-01-06T22:00:00"),
    },
    {
      sport: "Football",
      league: "EPL",
      teams: "Man United vs Tottenham",
      startTime: new Date("2026-01-07T22:00:00"),
    },
    {
      sport: "Football",
      league: "La Liga",
      teams: "Real Madrid vs Barcelona",
      startTime: new Date("2026-01-07T21:30:00"),
    },
    {
      sport: "Football",
      league: "La Liga",
      teams: "Atletico Madrid vs Sevilla",
      startTime: new Date("2026-01-08T21:30:00"),
    },
    {
      sport: "Football",
      league: "Bundesliga",
      teams: "Bayern Munich vs Dortmund",
      startTime: new Date("2026-01-08T21:30:00"),
    },
    {
      sport: "Football",
      league: "Serie A",
      teams: "Juventus vs AC Milan",
      startTime: new Date("2026-01-09T21:45:00"),
    },
    {
      sport: "Football",
      league: "Ligue 1",
      teams: "PSG vs Marseille",
      startTime: new Date("2026-01-10T21:00:00"),
    },

    // ================= TENNIS =================
    {
      sport: "Tennis",
      league: "ATP",
      teams: "Novak Djokovic vs Carlos Alcaraz",
      startTime: new Date("2026-01-06T14:00:00"),
    },
    {
      sport: "Tennis",
      league: "WTA",
      teams: "Iga Swiatek vs Aryna Sabalenka",
      startTime: new Date("2026-01-06T16:00:00"),
    },
    {
      sport: "Tennis",
      league: "ATP",
      teams: "Rafael Nadal vs Daniil Medvedev",
      startTime: new Date("2026-01-07T14:00:00"),
    },
    {
      sport: "Tennis",
      league: "ATP",
      teams: "Jannik Sinner vs Alexander Zverev",
      startTime: new Date("2026-01-08T15:00:00"),
    },
    {
      sport: "Tennis",
      league: "WTA",
      teams: "Coco Gauff vs Elena Rybakina",
      startTime: new Date("2026-01-08T17:00:00"),
    },
  ]);

  console.log("✅ Matches seeded successfully");
};
