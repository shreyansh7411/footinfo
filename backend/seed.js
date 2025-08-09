const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const connectDB = require('./db/connect');
const Standing = require('./models/season');
const Squad = require('./models/squad');
const squads = require('./data/laliga/squad2425')
require('dotenv').config();

/* const importStandings = async () => {
  const files = fs.readdirSync(path.join(__dirname, 'data/seriea/standings'));

  for (const file of files) {
    if (file.endsWith('.js')) {
      const data = require(`./data/seriea/standings/${file}`);
      await Standing.findOneAndUpdate(
        { id: data.id, league: data.league },
        data,
        { upsert: true, new: true }
      );
      console.log(`✅ Seeded standings for season: ${data.season}`);
    }
  }
}; */

const importSquad = async () => {
  for (const squad of squads) {
    await Squad.findOneAndUpdate(
      { teamId: squad.teamId, season: squad.season }, // ✅ correct fields
      squad,
      { upsert: true, new: true }
    );
  }
}; 


const seed = async () => {
  try {
    await connectDB(process.env.MONGO_URI); 
    /* await importStandings(); */
    await importSquad();
    console.log('🚀 All data seeded successfully!');
  } catch (err) {
    console.error('❌ Error during seeding:', err);
  } finally {
    mongoose.disconnect();
  }
};

seed();
