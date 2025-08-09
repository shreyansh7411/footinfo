const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  teamId: String,
  name: String,
  shortName: String,
  country: String,
  league: String,
  crestUrl: String,
  flagUrl: String,
  website: String,
  instagram: String,
  titles: Number
});


module.exports = mongoose.model('Team', TeamSchema);
