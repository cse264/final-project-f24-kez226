const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Import UUID function

const reviewSchema = new mongoose.Schema({
    userID: { type: String, required: true}, 
    movieID: { type: Number, required: true },
    reviewBody: { type: String, required: true },
    reviewRating: { type: Number, required: true},
});

module.exports = mongoose.model('Review', reviewSchema);
