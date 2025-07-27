const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  shirtNumber: {
    type: Number,
    required: true
  },
  position: {
    type: String,
    enum: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'],
    required: true
  },
  preferredFoot: {
    type: String,
    enum: ['Right', 'Left', 'Both'],
    default: 'Right'
  },
  contractUntil : {
    type : String,
    required : true
  },
  DOB : {
    type : String,
    required : true
  },
  height: {
    type : Number,
    required : true
  },
  averRating: {
    type : Number,
    required : true
  },
  country: {
    type: String,
    required: true
  },
  flagUrl: {
    type: String,
    required: true
  },
  totalGames: {
    type: Number,
    default: 0
  },
  totalGoals: {
    type: Number,
    default: 0
  },
  totalAssists: {
    type: Number,
    default: 0
  },
  imageUrl: {
    type: String,
    default: ''
  }
});

const SquadSchema = new mongoose.Schema({
  teamId: {
    type: String,
    required: true,
    uppercase: true
  },
  teamName: {
    type: String,
    required: true
  },
  crestUrl: {
    type: String,
    required: true
  },
  season: {
    type: String,
    required: true
  },
  players: [PlayerSchema]
});

module.exports = mongoose.model('Squad', SquadSchema);
