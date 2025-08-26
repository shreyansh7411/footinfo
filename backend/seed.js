const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const connectDB = require('./db/connect');
const Standing = require('./models/season');
const Squad = require('./models/squad');
const squads = require('./data/seriea/squad2425')
require('dotenv').config();

/* const importStandings = async () => {
  const files = fs.readdirSync(path.join(__dirname, 'data/laliga/standings'));

  for (const file of files) {
    if (file.endsWith('.js')) {
      const data = require(`./data/laliga/standings/${file}`);
      await Standing.findOneAndUpdate(
        { id: data.id, league: data.league },
        data,
        { upsert: true, new: true }
      );
      console.log(`✅ Seeded standings for season: ${data.season}`);
    }
  }
}; */

const squad = require('./data/ligue1/squad2425'); // adjust path if needed

const importBRE = async () => {
  const breTeam = squad.find(team => team.teamId === 'BRS');
  if (!breTeam) {
    console.error('BRE team not found!');
    return;
  }
  try {
    await Squad.findOneAndUpdate(
      { teamId: breTeam.teamId, season: breTeam.season },
      breTeam,
      { upsert: true, new: true }
    );
    console.log('BRE team seeded!');
  } catch (err) {
    console.error('Error seeding BRE:', err);
  }
};



/* const importSquad = async () => {
  for (const squad of squads) {
    await Squad.findOneAndUpdate(
      { teamId: squad.teamId, season: squad.season }, // ✅ correct fields
      squad,
      { upsert: true, new: true }
    );
  }
}; 
 */

const seed = async () => {
  try {
    await connectDB(process.env.MONGO_URI); 
    /* await importStandings(); */
    /* await importSquad(); */
    await importBRE();
    console.log('All data seeded successfully!');
  } catch (err) {
    console.error('❌ Error during seeding:', err);
  } finally {
    mongoose.disconnect();
  }
/*  try {
    await connectDB(process.env.MONGO_URI);
    const countBefore = await Standing.countDocuments({ league: "La Liga" });
    console.log(`Found ${countBefore} docs with league: laliga`);

    const result = await Standing.deleteMany({ league: "La Liga" });
    console.log(`Deleted ${result.deletedCount} documents.`);

    process.exit();
  } catch (err) {
    console.error("Error deleting:", err);
    process.exit(1);
  } */
};

seed();
