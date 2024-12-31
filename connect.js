const mongoose = require('mongoose');

const connectToMongoDb = async (url) => {
    try {
        await mongoose.connect(url);
        console.log('Connecting to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        throw error;
    }
};

module.exports = { connectToMongoDb };