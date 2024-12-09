import React from 'react';
import Slider from 'react-slick';
import { getImageUrl } from '../api/tmdb';
import './HeroSlider.css';
import StarIcon from '@mui/icons-material/Star'; // For ratings
import FavoriteIcon from '@mui/icons-material/Favorite'; // For popularity
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'; // For vote count
import InfoIcon from '@mui/icons-material/Info'; // For overview/details

function HeroSlider({ movies }) {
    const settings = {
        dots: true,                    // Show dots for navigation
        infinite: true,                // Infinite looping
        speed: 500,                    // Slide transition speed
        slidesToShow: 1,               // Number of slides visible
        slidesToScroll: 1,             // Number of slides to scroll
        autoplay: true,                // Enable autoplay
        autoplaySpeed: 5000,           // Speed between auto transitions (in milliseconds)
        pauseOnHover: true,            // Pause autoplay when hovering over the slider
        fade: true,                    // Enable fade transition (optional, more stylish)
    };

    return (
        <Slider {...settings}>
            {movies.map((movie) => (
                <div key={movie.id} className="hero-slide-item">
                    <img 
                        src={getImageUrl(movie.backdrop_path, "w780")} 
                        alt={movie.title} 
                
                    />
                    <div className="overlay"></div>
                    <div className="hero-slide-item-content">
                    <div className="hero-slide-text">
                            <h2 className="movie-title">{movie.title}</h2>
                            <InfoIcon /><p className="movie-description">{movie.overview}</p>
                            <div className="movie-rating">
                            <StarIcon style={{ color: '#FFD700' }}></StarIcon> {movie.vote_average}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    );
}

export default HeroSlider;
