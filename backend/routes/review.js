const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const User = require('../models/User');

// GET all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET all reviews
router.get('/', async (req, res) => {
    const movieTitle = req.body.movieTitle
    try {
        const reviews = await Review.find({movieTitle: movieTitle});
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create a new review
router.post('/', async (req, res) => {
    const { userID, movieTitle, reviewBody, reviewRating} = req.body;

    // Validate input before creating review
    if (!userID || !movieTitle || !reviewBody || !reviewRating) {
        return res.status(400).json({ message: 'User ID, movie, review, and rating are required.' });
    }

    const review = new Review({
        userID, movieTitle, reviewBody, reviewRating
    });

    try {
        const newReview = await review.save();
        res.status(201).json(newReview); // Return the created review
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/', async (req,res) => {
    const userID = req.body.userID;
    const movieTitle = req.body.movieTitle;

    //Validate require inputs
    if (!userID || !movieTitle){
        return res.status(400).json({message: 'User ID and movie title required to update review'})
    }

    const update = {}

    if (req.body.reviewRating){
        update.reviewRating = req.body.reviewRating
    }
    if (req.body.reviewBody){
        update.reviewBody = req.body.reviewBody
    }
    if (Object.keys(update).length === 0) {
        return res.status(400).json({message: "No valid fields to update."})
      }

    try {
        const updatedReview = await Review.updateOne(
            {userID: userID, movieTitle: movieTitle}, 
            {$set: update}
        );
        if (updatedReview.modifiedCount != 0)
            res.status(201).json({message: "Review updated."});
        else
            res.status(201).json({message: "No review found."})
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.delete('/', async(req,res) => {
    const { _id, userID } = req.body;

    if (!userID || !_id){
        return res.status(400).json({message: 'User and review IDs required to delete review'})
    }

    //add smth to check if the user is an admin
    let user = await User.findOne({userID: userID})
    if (user.accountType === "admin"){
        try {
            const deletedReview = await Review.deleteOne(
                {_id: _id}
            );
            if (deletedReview.deletedCount != 0)
                res.status(201).json({message: "Review deleted by admin."});
            else
                res.status(201).json({message: "No review found."});
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    else{
        try {
            const deletedReview = await Review.deleteOne(
                {userID: userID, _id: _id}
            );
            if (deletedReview.deletedCount != 0)
                res.status(201).json({message: "Review deleted."});
            else
                res.status(201).json({message: "No review found."});
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
})

module.exports = router;