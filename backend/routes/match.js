const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_TOKEN = '9404bab80e874defb78a2ac9d5bdfffd';

router.get('/api/matches/:leagueId', async (req, res) => {
  const { leagueId } = req.params;
  const { matchday, season } = req.query;

  try {
    if (!matchday) return res.status(400).json({ message: 'matchday is required' });
    if (matchday) {
      const response = await axios.get(
        `https://api.football-data.org/v4/competitions/${leagueId}/matches`,
        {
          headers: { 'X-Auth-Token': API_TOKEN },
          params: { matchday: matchday, season : season }
        }
      );
      return res.json(response.data)
    }
  } catch (err) {
    console.error(err.response?.data || err.message);
    return res.status(500).json({ message: 'Failed to fetch standings.' });
  }
});

module.exports = router;
