const express = require('express');
const axios = require('axios');
const Standing = require('../models/season');
const router = express.Router();

const API_TOKEN = '9404bab80e874defb78a2ac9d5bdfffd';

const leagueMap = {
    2021 : "Premier League",
    2014 :  "La Liga",
    2019 :  "Serie A",
    2002 :  "Bundesliga",
    2015 : "Ligue 1",
};

// Example: ['2022', '2023', '2024']
const getRecentSeasons = (count = 3) => {
  const current = new Date().getFullYear();
  return Array.from({ length: count }, (_, i) => current - i); // [2024, 2023, 2022]
};

router.get('/api/standings/:leagueId', async (req, res) => {
  const { leagueId } = req.params;
  const { season } = req.query;

  try {
    if (!season) return res.status(400).json({ message: 'Season is required' });
    const recentSeasons = getRecentSeasons(3).map(String);
    if (recentSeasons.includes(season)) {
      // ✅ API route: season format is just a number like 2023
      const response = await axios.get(
        `https://api.football-data.org/v4/competitions/${leagueId}/standings`,
        {
          headers: { 'X-Auth-Token': API_TOKEN },
          params: { season: season }
        }
      );

      const table = response.data.standings[0]?.table;
      if (!table) return res.status(404).json({ message: 'No standings found from API.' });

      const mapped = table.map(entry => ({
        position: entry.position,
        name: entry.team.shortName || entry.team.name,
        crest: entry.team.crest,
        played: entry.playedGames,
        won: entry.won,
        drawn: entry.draw,
        lost: entry.lost,
        gf: entry.goalsFor,
        ga: entry.goalsAgainst,
        gd: entry.goalDifference,
        points: entry.points,
        form: entry.form || null,
      }));

      return res.json(mapped);
    } else {
        let mongoSeason = season;
        let mongoLeague = leagueMap[leagueId];
        if (/^\d{4}$/.test(season)) {
            const next = (parseInt(season) + 1).toString().slice(2);
            mongoSeason = `${season}-${next}`;
        }

        const data = await Standing.findOne({ season: mongoSeason, league: mongoLeague });
        if (!data) return res.status(404).json({ message: 'No standings found in DB.' });
        const mapped = data.table.map(entry => ({
            position: entry.position,
            name: entry.team,
            crest: entry.crest,
            played: entry.played,
            won: entry.won,
            drawn: entry.drawn,
            lost: entry.lost,
            gf: entry.gf,
            ga: entry.ga,
            gd: entry.gd,
            points: entry.points,
            form: entry.lastFive || null
        }));

        return res.json(mapped);
    }

  } catch (err) {
    console.error(err.response?.data || err.message);
    return res.status(500).json({ message: 'Failed to fetch standings.' });
  }
});

module.exports = router;


/* const express = require('express');
const axios = require('axios');

const router = express.Router();
const API_TOKEN = '9404bab80e874defb78a2ac9d5bdfffd';

router.get('/api/standings/:leagueId', async(req, res) => {
    const { leagueId} = req.params;
    const { season } = req.query;

    try {
        const response = await axios.get(
          `https://api.football-data.org/v4/competitions/${leagueId}/standings`,
            {
                headers: { 'X-Auth-Token': API_TOKEN },
                params: { season : season }
            }
        );

        const table = response.data.standings[0]?.table;
    
        if(!table ){
            res.json({message : 'No standings found'})
        }

        const result = table.map(entry => ({
            id: entry.team.id,
            name: entry.team.shortName || entry.team.name,
            points: entry.points,
            played: entry.playedGames,
            won: entry.won,
            draw: entry.draw,
            lost: entry.lost,
            form: entry.form,
            crest: entry.team.crest,
            position: entry.position,
            goalDifference: entry.goalDifference,
            points: entry.points,
        }))

        res.json(result)
    } catch (error) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ message: 'Failed to fetch standings.' });
    }
})

module.exports = router; */