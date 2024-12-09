import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography, Box, Alert } from '@mui/material';
import '../styles/Reviews.css';

const Reviews = ({ movieTitle, movieID, userID }) => {
    const [reviews, setReviews] = useState([]); // Ensure reviews is an array
    const [newReview, setNewReview] = useState({
        userID: userID,
        movieID: movieID,
        reviewBody: '',
        reviewRating: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch reviews for the specific movie
    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3000/api/reviews/movieID/${movieID}`)
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setReviews(data); // Ensure that data is an array
                } else {
                    console.error('Unexpected data format:', data);
                    setError('Failed to load reviews. Please login.');
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching reviews:', error);
                setError('Failed to load reviews. Please login.');
                setLoading(false);
            });
    }, [movieID]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReview({
            ...newReview,
            [name]: value,
        });
    };

    const handleSubmitReview = () => {
        // Validate that review body and rating are not empty
        if (!newReview.reviewBody || !newReview.reviewRating) {
            setError('Review body and rating are required.');
            return;
        }

        // Log the data that will be sent in the request body
        const reviewData = {
            userID: newReview.userID,
            movieID: newReview.movieID,
            reviewBody: newReview.reviewBody,
            reviewRating: newReview.reviewRating,
        };

        console.log('Sending review data:', reviewData); // This will log the data

        // Construct the URL for the POST request
        const url = 'http://localhost:3000/api/reviews';

        // Send the POST request with the review data
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Indicate that we're sending JSON data
            },
            body: JSON.stringify(reviewData), // Send the review data
        })
            .then((response) => {
                // Check if the response was successful
                if (!response.ok) throw new Error('Failed to save the review');
                return response.json(); // Parse the JSON response
            })
            .then((data) => {
                // Add the new review to the state
                setReviews((prevReviews) => [...prevReviews, data]);
                resetForm(); // Reset the form after submitting the review
            })
            .catch((error) => {
                console.error('Error submitting review:', error);
                setError('Failed to submit review. Please login.');
            });
    };


    const handleDeleteReview = (reviewId) => {
        fetch('http://localhost:3000/api/reviews', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id: reviewId, userID }),
        })
            .then((response) => {
                if (!response.ok) throw new Error('Failed to delete review');
                return response.json();
            })
            .then(() => {
                setReviews(reviews.filter((review) => review._id !== reviewId));
            })
            .catch((error) => {
                console.error('Error deleting review:', error);
                setError('Failed to delete review. Please login.');
            });
    };

    const resetForm = () => {
        setNewReview({
            userID: userID,
            movieID: movieID,
            reviewBody: '',
            reviewRating: '',
        });
        setError('');
    };

    if (loading) return <div>Loading reviews...</div>;

    return (
        <Box className="reviews-container" sx={{ margin: '20px', backgroundColor: '#000', color: '#fff' }}>
            <Typography variant="h6" gutterBottom>
                All Reviews for Movie: {movieTitle} (ID: {movieID})
            </Typography>

            {error && (
                <Alert severity="error" onClose={() => setError('')}>
                    {error}
                </Alert>
            )}

            <Box>
                {Array.isArray(reviews) && reviews.length > 0 ? (
                    reviews.map((review) => (
                        <Box key={review._id} sx={{ marginBottom: 2, padding: 2, backgroundColor: '#333', borderRadius: 2 }}>
                            <Typography variant="h6">{review.movieTitle}</Typography>
                            <Typography variant="body1">{review.reviewBody}</Typography>
                            <Typography variant="body2">Rating: {review.reviewRating}</Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button variant="contained" color="error" onClick={() => handleDeleteReview(review._id)}>
                                    Delete Review
                                </Button>
                            </Box>
                        </Box>
                    ))
                ) : (
                    <Typography variant="body1">No reviews available.</Typography>
                )}
            </Box>

            <Box>
                <Typography variant="h6" gutterBottom>
                    Create a New Review
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        backgroundColor: 'red', // Set the background color to red
                        padding: 2, // Optional: Add some padding inside the box for spacing
                        borderRadius: 2, // Optional: Add rounded corners to the box
                    }}
                >
                    <TextField
                        label="Review Body"
                        name="reviewBody"
                        value={newReview.reviewBody}
                        onChange={handleInputChange}
                        variant="outlined"
                        multiline
                        rows={4}
                        sx={{
                            '& .MuiInputLabel-root': { color: '#fff' }, // Label color
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#fff' }, // Border color
                                '& input': { color: '#fff' }, // Input text color
                                '&:hover fieldset': { borderColor: '#fff' }, // Border on hover
                            },
                            '& .MuiOutlinedInput-root.Mui-focused': {
                                '& fieldset': { borderColor: '#fff' }, // Focused border color
                            },
                        }}
                    />
                    <TextField
                        label="Review Rating"
                        name="reviewRating"
                        value={newReview.reviewRating}
                        onChange={handleInputChange}
                        variant="outlined"
                        sx={{
                            '& .MuiInputLabel-root': { color: '#fff' }, // Label color
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#fff' }, // Border color
                                '&:hover fieldset': { borderColor: '#fff' }, // Border on hover
                            },
                            '& .MuiOutlinedInput-root.Mui-focused': {
                                '& fieldset': { borderColor: '#fff' }, // Focused border color
                            },
                        }}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmitReview}
                        sx={{
                            marginTop: 2,
                            '&:hover': { backgroundColor: '#fff', color: '#000' },
                        }}
                    >
                        Submit Review
                    </Button>
                </Box>


            </Box>
        </Box>
    );
};

export default Reviews;
