const express = require('express');
const cors = require('cors');
const standingsRoute = require('./routes/standings.js');
const squadRoute = require('./routes/squad.js');
const connectDB = require('./db/connect.js')
require('dotenv').config();
const app = express();

app.use(cors());

app.use(standingsRoute);
app.use(squadRoute);

const PORT = process.env.PORT || 4000;

const start = async()=> {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, console.log(`server is listening on the port ${PORT}`))
    } catch (error) {
        console.log(error);
        
    }
}

start();