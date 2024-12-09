const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// login to return userID
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        res.json({ userID: user.userID });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create a new user
router.post('/', async (req, res) => {
    const { password, accountType, email, name } = req.body;

    // Validate input before creating user
    if (!password || !name || !email) {
        return res.status(400).json({ message: 'Password, name, and email are required.' });
    }

    const user = new User({
        password,  
        "accountType" : "user",
        email, 
        name,
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:requestingUserID/:targetUserID', async (req, res) => {
        const { requestingUserID, targetUserID } = req.params;

    try {
        const requestingUser = await User.findOne({ userID: String(requestingUserID) });
        if (!requestingUser) {
            return res.status(404).json({ message: 'Requesting user not found' });
        }
        if (requestingUser.accountType !== 'admin') {
            return res.status(403).json({ message: 'Only admin users can delete other users.' });
        }

        const targetUser = await User.findOne({ userID: targetUserID });
        if (!targetUser) {
            return res.status(404).json({ message: 'Target user not found.' });
        }

        if (targetUser.accountType === 'admin') {
            return res.status(403).json({ message: 'Admin users cannot be deleted.' });
        }

        await User.findOneAndDelete({ userID: targetUserID });
        res.json({ message: `User with userID ${targetUserID} has been deleted.` });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update User Password Route
router.put('/:userID/password', async (req, res) => {
    const { userID } = req.params;
    const { oldPassword, newPassword } = req.body; // old and new password from the user
    try {
        const user = await User.findOne({ userID: userID });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.password !== oldPassword) {
            return res.status(400).json({ message: 'Old password does not match' });
        }
        if (oldPassword === newPassword) {
            return res.status(400).json({ message: 'New password cannot be the same as old password' });
        }
        user.password = newPassword;
        await user.save();
        res.json({ message: 'Password updated successfully' });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
