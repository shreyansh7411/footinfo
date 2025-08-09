const express = require('express');
const router = express.Router();
const Squad = require('../models/squad.js');

/* router.get("/api/squad/:teamIdOrName", async (req, res) => {
  const { teamIdOrName } = req.params;
  const decoded = decodeURIComponent(teamIdOrName);
  try {
    let squad = await Squad.findOne({ teamId: decoded });
    if (!squad) {
      squad = await Squad.findOne({ teamName: decoded });
    }
    if (!squad) {
      return res.status(404).json({ message: "Squad not found" });
    }
    res.json(squad);
  } catch (error) {
    console.error("Error fetching squad:", error);
    res.status(500).json({ message: "Server error" });
  }
}); */


router.get("/api/squad/:teamName", async (req, res) => {
  const { teamName } = req.params;
  const decodedName = decodeURIComponent(teamName)
  try {
    const squad = await Squad.findOne({ teamName : decodedName });
    if (!squad) return res.status(404).json({ message: "Squad not found" });
    res.json(squad);
  } catch (error) {
    console.error("Error fetching squad:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/api/squadby-id/:teamId", async (req, res) => {
  const { teamId } = req.params;
  try {
    const squad = await Squad.findOne({ teamId : teamId });
    if (!squad) return res.status(404).json({ message: "Squad not found" });
    res.json(squad);
  } catch (error) {
    console.error("Error fetching squad:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;