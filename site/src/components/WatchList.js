import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, List, ListItem, ListItemText, TextField } from '@mui/material';

const WatchList = ({ userID }) => {
    const [watchList, setWatchList] = useState([]);
    const [newMovieID, setNewMovieID] = useState('');  // Ensure this is initialized
    const [error, setError] = useState('');

    // Fetch watchlist when userID changes
    useEffect(() => {
        if (userID) {
            fetch(`http://localhost:3000/api/watchlist/${userID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    setWatchList(data);
                    setError('');  // Clear any previous errors
                })
                .catch(error => {
                    console.error('Error fetching watchlist:', error);
                    setError('Failed to load watchlist');
                });
        }
    }, [userID]);

    // If user is not logged in, show login message
    if (!userID) {
        return <div>Please log in to see your watchlist</div>;
    }

    // Add a movie to the watchlist
    const handleAddToWatchList = () => {
        if (!newMovieID) {
            setError('Please enter a movie ID');
            return;
        }

        fetch('http://localhost:3000/api/watchlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userID, movieID: newMovieID }),
        })
            .then(response => response.json())
            .then(data => {
                setWatchList(prevWatchList => [...prevWatchList, data.watchListItem]);
                setNewMovieID(''); // Reset input after adding the movie
                setError(''); // Clear error message
            })
            .catch(error => {
                console.error('Error adding to watchlist:', error);
                setError('Failed to add movie to watchlist');
            });
    };

    // Remove a movie from the watchlist
    const handleRemoveFromWatchList = (movieID) => {
        fetch('http://localhost:3000/api/watchlist', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userID, movieID }),
        })
            .then(response => response.json())
            .then(() => {
                setWatchList(prevWatchList => prevWatchList.filter(item => item.movieID !== movieID));
            })
            .catch(error => {
                console.error('Error removing from watchlist:', error);
                setError('Failed to remove movie from watchlist');
            });
    };

    return (
        <Box sx={{ padding: 2, backgroundColor: '#121212', color: '#fff' }}>
            <Typography variant="h5" gutterBottom>
                Your Watchlist
            </Typography>

            {error && (
                <Typography variant="body1" color="error" sx={{ marginBottom: 2 }}>
                    {error}
                </Typography>
            )}

            <List>
                {watchList.length > 0 ? (
                    watchList.map((item) => (
                        <ListItem
                            key={item._id}
                            sx={{
                                backgroundColor: '#333',
                                marginBottom: 1,
                                borderRadius: 2,
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <ListItemText primary={`Movie ID: ${item.movieID}`} />
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => handleRemoveFromWatchList(item.movieID)}
                                sx={{ marginLeft: 2 }}
                            >
                                Remove
                            </Button>
                        </ListItem>
                    ))
                ) : (
                    <Typography variant="body1">Your watchlist is empty.</Typography>
                )}
            </List>

            <Box sx={{ marginTop: 2 }}>
                <Typography variant="h6">Add a Movie to Your Watchlist</Typography>
                <TextField
                    type="text"
                    value={newMovieID}
                    onChange={(e) => setNewMovieID(e.target.value)}
                    placeholder="Enter movie ID"
                    sx={{
                        width: '100%',
                        backgroundColor: '#333',
                        color: '#fff',
                        border: '1px solid #fff',
                        marginTop: 2,
                        padding: '8px 16px',
                    }}
                />
                <Button
                    variant="contained"
                    onClick={handleAddToWatchList}
                    sx={{
                        backgroundColor: 'transparent',
                        color: '#fff',
                        borderColor: '#fff',
                        '&:hover': {
                            backgroundColor: '#fff',
                            color: '#000',
                        },
                    }}
                >
                    Add to Watchlist
                </Button>
            </Box>
        </Box>
    );
};

export default WatchList;
