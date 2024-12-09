import React from 'react';
import './MovieList.css';
import Movie from './Movie';

function MovieList({ title, movies, onClick }) {
    return (
        <div className="movie-list">
            <h2>{title}</h2>
            <div className="movie-items">
                {movies.map((movie) => (
                    <Movie
                        key={movie.id}
                        movie={movie}
                        onClick={() => onClick(movie.id)} 
                    />
                ))}
            </div>
        </div>
    );
}

export default MovieList;
