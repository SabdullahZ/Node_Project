const mongoose = require('mongoose');
require('dotenv').config();
// Connection URL
//const mongodbURL = process.env.MONGODB_URL_LOCAL; // Hotel database
const mongodbURL =process.env.MONGODB_URL
// Setup MongoDB connection
mongoose.connect(mongodbURL);

/* { in mongoose version 6 we no longer need them
    useNewUrlParser: true,
    useUnifiedTopology: true
});*/

// Default connection
const db = mongoose.connection; //db object maintains mongoose to establish connection

// Event listeners
db.on('connected', () => {
    console.log('Connected to MongoDB server...');
});

db.on('error', (err) => {
    console.error('Connection error:', err);
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB server...');
});

// Export MongoDB connection
module.exports = db;
