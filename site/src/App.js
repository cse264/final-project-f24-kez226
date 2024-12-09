import React, { useEffect, useState, useRef } from 'react';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import MovieList from './components/MovieList';
import Users from './components/Users';
import Reviews from './components/Reviews';
import WatchList from './components/WatchList';
import { fetchMovies } from './api/tmdb';
import './App.css';


function App() {
    const homeRef = useRef(null);
    const reviewsRef = useRef(null);
    const watchlistRef = useRef(null);
    const usersRef = useRef(null);

    const scrollToSection = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    };

    const [heroMovies, setHeroMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userID, setUserID] = useState(null); // To store the logged-in user's ID

    useEffect(() => {
        const fetchAllMovies = async () => {
            try {
                const topRated = await fetchMovies('/movie/top_rated');
                const popular = await fetchMovies('/movie/popular');
                const nowPlaying = await fetchMovies('/movie/now_playing');
                const upcoming = await fetchMovies('/movie/upcoming');

                setHeroMovies(topRated.slice(0, 5));
                setPopularMovies(popular);
                setNowPlayingMovies(nowPlaying);
                setUpcomingMovies(upcoming);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllMovies();
    }, []);

    const[isReviews, setIsReviews] = useState(false);

    const handleMovieClick = () => {
        setIsReviews(true);
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div className="App">
            {/* Navbar for scrolling to sections */}
            <Navbar/>
            {/* Sections */}
            <section ref={homeRef} className="section home">
                <HeroSlider movies={heroMovies} />
            </section>

            <section ref={reviewsRef} className="section reviews">
                <MovieList title="Popular Movies" movies={popularMovies} onClick={handleMovieClick} />
            </section>

            <section ref={watchlistRef} className="section watchlist">
                <MovieList title="Now Playing" movies={nowPlayingMovies} onClick={handleMovieClick}/>
                <MovieList title="Upcoming Movies" movies={upcomingMovies} onClick={handleMovieClick} />
            </section>

            <section ref={usersRef} className="section users">
                <Users setUserID={setUserID} />
            </section>

            <section ref={usersRef} className="section reviews">
                {isReviews && (<Reviews />)}
            </section>

            <section ref={usersRef} className="section watchlist">
                <WatchList userID={userID} />
            </section>
        </div>
    );
}

export default App;
