const express = require('express');
const router = express.Router();
const WatchList = require('../models/WatchList');

// Add a movie to a user's watchlist
router.post('/', async (req, res) => {
    const { userID, movieID } = req.body;
    try {
        const watchListItem = new WatchList({
            userID: userID,
            movieID: movieID
        });

        await watchListItem.save();
        res.status(201).json({ message: 'Movie added to watchlist', watchListItem });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all movies from a user's watchlist
router.get('/:userID', async (req, res) => {
    const { userID } = req.params;

    try {
        const watchList = await WatchList.find({ userID: userID })
        res.json(watchList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Remove a movie from a user's watchlist
router.delete('/', async (req, res) => {
    const { userID, movieID } = req.body;

    try {
        const result = await WatchList.deleteOne({ userID: userID, movieID: movieID });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Movie not found in watchlist' });
        }

        res.json({ message: 'Movie removed from watchlist' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
