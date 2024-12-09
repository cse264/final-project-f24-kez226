import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import '../styles/Reviews.css';

const Reviews = ({ movieId }) => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({
        userID: '', 
        movieId: movieId, // Pass movieId here to associate with the movie
        movieTitle: '',
        reviewBody: '',
        reviewRating: ''
    });
    const [loading, setLoading] = useState(true);

    // Fetch reviews for the specific movie
    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3000/api/reviews/${movieId}`)  // Fetch reviews for this movie
            .then(response => response.json())
            .then(data => {
                setReviews(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
                setLoading(false);
            });
    }, [movieId]); // Re-fetch when movieId changes

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReview({
            ...newReview,
            [name]: value
        });
    };

    const handleSubmitReview = () => {
        fetch('http://localhost:3000/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newReview)
        })
            .then(response => response.json())
            .then(data => {
                setReviews([...reviews, data]); // Add the new review to the list
                setNewReview({ userID: '', movieTitle: '', reviewBody: '', reviewRating: '' }); // Reset the form
            })
            .catch(error => console.error('Error submitting review:', error));
    };

    const handleDeleteReview = (reviewId) => {
        fetch('http://localhost:3000/api/reviews', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id: reviewId, userID: '...' }) // Replace with actual userID
        })
            .then(response => response.json())
            .then(() => {
                setReviews(reviews.filter(review => review._id !== reviewId)); // Remove deleted review from state
            })
            .catch(error => console.error('Error deleting review:', error));
    };

    if (loading) return <div>Loading reviews...</div>;

    return (
        <Box className="reviews-container" sx={{ margin: '20px', backgroundColor: '#000', color: '#fff' }}>
            {/* Reviews Section */}
            <Typography variant="h6" gutterBottom>
                All Reviews for {newReview.movieTitle}
            </Typography>

            {/* Display Existing Reviews */}
            <Box>
                {reviews.map((review) => (
                    <Box key={review._id} sx={{ marginBottom: 2, padding: 2, backgroundColor: '#333', borderRadius: 2 }}>
                        <Typography variant="h6">{review.movieTitle}</Typography>
                        <Typography variant="body1">{review.reviewBody}</Typography>
                        <Typography variant="body2">Rating: {review.reviewRating}</Typography>
                        <Button variant="contained" color="error" onClick={() => handleDeleteReview(review._id)}>
                            Delete Review
                        </Button>
                    </Box>
                ))}
            </Box>

            {/* Review Form for New Review */}
            <Box>
                <Typography variant="h6" gutterBottom sx={{ color: '#fff' }}>
                    Create a New Review
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, backgroundColor: 'transparent', color: '#fff' }}>
                    <TextField
                        label="Movie Title"
                        name="movieTitle"
                        value={newReview.movieTitle}
                        onChange={handleInputChange}
                        variant="outlined"
                        sx={{
                            backgroundColor: 'transparent', color: '#fff', borderColor: '#fff',
                            '& .MuiInputLabel-root': { color: '#fff' },
                            '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#fff' } }
                        }}
                    />
                    <TextField
                        label="Review Body"
                        name="reviewBody"
                        value={newReview.reviewBody}
                        onChange={handleInputChange}
                        variant="outlined"
                        multiline
                        rows={4}
                        sx={{
                            backgroundColor: 'transparent', color: '#fff', borderColor: '#fff',
                            '& .MuiInputLabel-root': { color: '#fff' },
                            '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#fff' } }
                        }}
                    />
                    <TextField
                        label="Review Rating"
                        name="reviewRating"
                        value={newReview.reviewRating}
                        onChange={handleInputChange}
                        variant="outlined"
                        sx={{
                            backgroundColor: 'transparent', color: '#fff', borderColor: '#fff',
                            '& .MuiInputLabel-root': { color: '#fff' },
                            '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#fff' }, '&:hover fieldset': { borderColor: '#fff' } }
                        }}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmitReview}
                        sx={{
                            marginTop: 2, backgroundColor: 'transparent', color: '#fff',
                            borderColor: '#fff', '&:hover': { backgroundColor: '#fff', color: '#000' }
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
