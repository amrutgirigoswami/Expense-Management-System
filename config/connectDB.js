const mongoose = require('mongoose');
const colors = require('colors');
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log(`Mongo Connected and Running on ${mongoose.connection.host}`.bgCyan.white);
    } catch (error) {
        console.log(`${error}`.bgRed);
    }
}


module.exports = connectDB;