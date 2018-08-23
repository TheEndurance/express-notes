const mongoose = require('mongoose');


const connectionString = `mongodb://admin:password123@db-notes:27017/notes`;

console.log(process.env.MONGODB_USERNAME);

mongoose.connect(connectionString);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let db;

async function connectDB() {
    if 
}