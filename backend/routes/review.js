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

// GET all reviews by movieID
router.get('/:movieID', async (req, res) => {
    const movieID = req.params.movieID
    try {
        const reviews = await Review.find({movieID: movieID});
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET all reviews by userID
router.get('/:userID', async (req, res) => {
    const userID = req.params.userID
    try {
        const reviews = await Review.find({userID: userID});
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET all reviews by userID and movieID
router.get('/:userID&movieID', async (req, res) => {
    const userID = req.params.userID
    const movieID = req.params.movieID
    try {
        const reviews = await Review.find({userID: userID, movieID: movieID});
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create a new review
router.post('/', async (req, res) => {
    const { userID, movieID, reviewBody, reviewRating} = req.body;

    // Validate input before creating review
    if (!userID || !movieID || !reviewBody || !reviewRating) {
        return res.status(400).json({ message: 'User ID, movie, review, and rating are required.' });
    }

    const review = new Review({
        userID, movieID, reviewBody, reviewRating
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
    const movieID = req.body.movieID;

    //Validate require inputs
    if (!userID || !movieID){
        return res.status(400).json({message: 'User and movie IDs are required to update review'})
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
            {userID: userID, movieID: movieID}, 
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

//delete single review
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

//below routes need a way to check if the userId specified is the actual user


//delete all user reviews
router.delete('/:userID', async(req,res) => {
    const userID = req.params
    const currUser = req.body.userID
    if (userID == currUser){
        try {
            const deletedReview = await Review.delete(
                {userID: userID}
            );
            if (deletedReview.deletedCount != 0)
                res.status(201).json({message: "Reviews deleted."});
            else
                res.status(201).json({message: "No review found."});
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    else{
        let user = await User.findOne({userID: userID})
        if (user.accountType === "admin"){
            try {
                const deletedReview = await Review.delete(
                    {userID: userID}
                );
                if (deletedReview.deletedCount != 0)
                    res.status(201).json({message: "Reviews deleted."});
                else
                    res.status(201).json({message: "No review found."});
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        }
        else{
            res.status(400).json({message: "Can't delete another user's reviews"})
        }
    }
})

//delete all movieID reviews by user
router.delete('/:userID&movieID', async(req,res) => {
    const userID = req.params.userID
    const movieID = req.params.movieID
    const currUser = req.body.userID
    if (userID == currUser){
        try {
            const deletedReview = await Review.delete(
                {userID: userID, movieID: movieID}
            );
            if (deletedReview.deletedCount != 0)
                res.status(201).json({message: "Reviews deleted."});
            else
                res.status(201).json({message: "No review found."});
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    else{
        let user = await User.findOne({userID: userID})
        if (user.accountType === "admin"){
            try {
                const deletedReview = await Review.delete(
                    {userID: userID, movieID: movieID}
                );
                if (deletedReview.deletedCount != 0)
                    res.status(201).json({message: "Reviews deleted."});
                else
                    res.status(201).json({message: "No review found."});
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        }
        else{
            res.status(400).json({message: "Can't delete another user's reviews"})
        }
    }
})

module.exports = router;