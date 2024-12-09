import React, { useState } from 'react';
import '../styles/MovieList.css';
import { getImageUrl } from '../api/tmdb';
import Reviews from './Reviews.js'

// Import MUI Icons
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import InfoIcon from '@mui/icons-material/Info';

function MovieList({ title, movies }) {
    const [expandedMovie, setExpandedMovie] = useState(null); // To store the selected movie

    const handleMovieClick = (movie) => {
        setExpandedMovie(movie); // Set the clicked movie for expansion
    };

    const handleClose = () => {
        setExpandedMovie(null); // Close the expanded window
    };

    return (
        <div className="movie-list">
            <h2>{title}</h2>
            <div className="movie-items">
                {movies.map((movie) => (
                    <div
                        key={movie.id}
                        className="movie-item"
                        onClick={() => handleMovieClick(movie)} // Add click handler
                        style={{ cursor: 'pointer' }}
                    >
                        <img
                            src={getImageUrl(movie.poster_path)}
                            alt={movie.title}
                        />
                        {/* Hover details */}
                        <div className="movie-hover-details">
                            <h3>{movie.title}</h3>

                            <p>
                                Movie ID: {movie.id}
                            </p>
                            <p>
                                <FavoriteIcon style={{ color: '#e50914' }} /> Popularity: {movie.popularity}
                            </p>
                            <p>
                                <PeopleAltIcon /> Votes: {movie.vote_count}
                            </p>
                            <p>
                                <StarIcon style={{ color: '#FFD700' }} /> Ratings: {movie.vote_average}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Expanded Movie Details */}
            {expandedMovie && (
                <div className="expanded-movie-window">
                    <div className="expanded-movie-content">

                        <img
                            src={getImageUrl(expandedMovie.poster_path)}
                            alt={expandedMovie.title}
                            className="expanded-movie-poster"
                        />
                        <div className="expanded-movie-details">
                            <h2>{expandedMovie.title}</h2>
                            <InfoIcon /><p><strong>Overview:</strong> {expandedMovie.overview}</p>
                            <p><strong>Popularity:</strong> {expandedMovie.popularity}</p>
                            <p><strong>Votes:</strong> {expandedMovie.vote_count}</p>
                            <p><strong>Ratings:</strong> {expandedMovie.vote_average}</p>
                        </div>
                        <button className="close-button" onClick={handleClose}>Close</button>

                        {/* Reviews Section */}
                        <div className="movie-reviews">
                            <h3>Reviews</h3>
                            <Reviews movieId={expandedMovie.id} />
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

export default MovieList;
