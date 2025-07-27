const mongoose = require('mongoose');

const TeamStandingSchema = new mongoose.Schema({
  team: String,
  position: Number,
  crest: String,
  played: Number,
  won: Number,
  drawn: Number,
  lost: Number,
  gf: Number, 
  ga: Number, 
  gd: Number, 
  points: Number,
  lastFive: String
});

const StandingSchema = new mongoose.Schema({
  id: String, 
  season: String, 
  league: String,
  table: [TeamStandingSchema]
});

module.exports = mongoose.model('Standing', StandingSchema);
