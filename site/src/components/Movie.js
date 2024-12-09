import React from 'react';
import './MovieList.css';
import { getImageUrl } from '../api/tmdb';

// Import MUI Icons
import StarIcon from '@mui/icons-material/Star'; // For ratings
import FavoriteIcon from '@mui/icons-material/Favorite'; // For popularity
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'; // For vote count
import InfoIcon from '@mui/icons-material/Info'; // For overview/details

function Movie({ movie, onClick }) {
    return (
        <div className="movie-item" onClick={onClick}>
            <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
            />
            <div className="movie-hover-details">
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
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
    );
}

export default Movie;
