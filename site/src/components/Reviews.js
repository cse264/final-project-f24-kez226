import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import './Reviews.css';
import { getImageUrl } from '../api/tmdb'; // Assuming you have this function to fetch movie poster URLs

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({
        userID: '',
        movieTitle: '',
        reviewBody: '',
        reviewRating: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:3000/api/reviews') 
            .then(response => response.json())
            .then(data => {
                setReviews(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
                setLoading(false);
            });
    }, []);

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
                setReviews([...reviews, data]);
                setNewReview({ userID: '', movieTitle: '', reviewBody: '', reviewRating: '' });
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
            .then(data => {
                setReviews(reviews.filter(review => review._id !== reviewId));
            })
            .catch(error => console.error('Error deleting review:', error));
    };

    // Show loading message until reviews are fetched
    if (loading) return <div>Loading reviews...</div>;

    return (
        <Box className="reviews-container" sx={{ margin: '20px', backgroundColor: '#000', color: '#fff' }}>
            {/* Reviews Section */}
            <Typography variant="h6" gutterBottom>
                All Reviews
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

            <Box>
                {/* Form for Creating New Review */}
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: '#fff' }} // White color for the title
                >
                    Create a New Review
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        backgroundColor: 'transparent', // Make Box transparent
                        color: '#fff' // Set text color to white
                    }}
                >
                    <TextField
                        label="Movie Title"
                        name="movieTitle"
                        value={newReview.movieTitle}
                        onChange={handleInputChange}
                        variant="outlined"
                        sx={{
                            backgroundColor: 'transparent', // Transparent background
                            color: '#fff', // White text color
                            borderColor: '#fff', // White border color
                            '& .MuiInputLabel-root': {
                                color: '#fff', // White label color
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#fff', // White border
                                },
                                '&:hover fieldset': {
                                    borderColor: '#fff', // White border on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#fff', // White border when focused
                                },
                                '& input': {
                                    color: '#fff', // White text color in input field
                                },
                            },
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
                            backgroundColor: 'transparent', // Transparent background
                            color: '#fff', // White text color  
                            borderColor: '#fff', // White border color
                            '& .MuiInputLabel-root': {
                                color: '#fff', // White label color
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#fff', // White border
                                },
                                '&:hover fieldset': {
                                    borderColor: '#fff', // White border on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#fff', // White border when focused
                                },
                                '& textarea': {
                                    color: '#fff', // White text color for multiline (textarea)
                                },
                                '& input': {
                                    color: '#fff', // White text color for input fields
                                },
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
                            backgroundColor: 'transparent', // Transparent background
                            color: '#fff', // White text color  
                            borderColor: '#fff', // White border color
                            '& .MuiInputLabel-root': {
                                color: '#fff', // White label color
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#fff', // White border
                                },
                                '&:hover fieldset': {
                                    borderColor: '#fff', // White border on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#fff', // White border when focused
                                },
                                '& input': {
                                    color: '#fff', // White text color in input field
                                },
                            },
                        }}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmitReview}
                        sx={{
                            marginTop: 2,
                            backgroundColor: 'transparent',  // Transparent button background
                            color: '#fff',  // White text color
                            borderColor: '#fff',  // White border for the button
                            '&:hover': {
                                backgroundColor: '#fff',  // White background on hover
                                color: '#000',  // Black text color on hover
                            },
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
