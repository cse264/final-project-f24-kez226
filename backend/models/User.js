const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userID: {type: String, required: true, default: () => 1},
    // userID: { type: String, required: true, unique: true, default: () => uuidv4() }, 
    password: { type: String, required: true },
    email: {type: String, required: true},
    name: {type: String, required: true},
    accountType: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
