const mongoose = require('mongoose');

const watchListSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        ref: 'User' 
    },
    movieID: {
        type: String, 
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('WatchList', watchListSchema);
