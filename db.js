const mongoose = require('mongoose');

// Connection URL
const mongodbURL = 'mongodb://localhost:27017/hotels'; // Hotel database

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
