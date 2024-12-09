import React, { useEffect, useState, useRef } from 'react';
import HeroSlider from './components/HeroSlider';
import MovieList from './components/MovieList';
import Users from './components/Users';
import WatchList from './components/WatchList';
import { fetchMovies } from './api/tmdb';
import './App.css';

function App() {
    const homeRef = useRef(null);
    const reviewsRef = useRef(null);
    const watchlistRef = useRef(null);
    const usersRef = useRef(null);

    // Scroll to section function
    const scrollToSection = (ref) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
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

    if (loading) return <div>Loading...</div>;

    return (
        <div className="App">
            {/* Navbar for scrolling to sections */}
            <div className="nav-wrapper">
                <div className="container">
                    <div className="nav">
                        <a href="/" className="logo">
                            <i className="fa fa-popcorn"></i>
                            Pop<span className="main-color">Corn</span>Path
                        </a>

                        {/* Navigation Links */}
                        <nav className="navbar">
                            <ul className="nav-links">
                                <li onClick={() => scrollToSection(homeRef)}>Home</li>
                                <li onClick={() => scrollToSection(reviewsRef)}>Movies</li>
                                <li onClick={() => scrollToSection(reviewsRef)}>Reviews</li>
                                <li onClick={() => scrollToSection(usersRef)}>Admin</li>
                                <li onClick={() => scrollToSection(watchlistRef)}>Watchlist</li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Sections */}
            <section ref={homeRef} className="section home">
                <HeroSlider movies={heroMovies} />
            </section>

            <section ref={reviewsRef} className="section reviews">
                <MovieList title="Popular Movies" userID={userID} movies={popularMovies} />
            </section>

            <section ref={watchlistRef} className="section watchlist">
                <MovieList title="Now Playing" userID={userID} movies={nowPlayingMovies} />
                <MovieList title="Upcoming Movies" userID={userID} movies={upcomingMovies} />
            </section>

            <section ref={usersRef} className="section users">
                <Users setUserID={setUserID} />
            </section>

            <section ref={watchlistRef} className="section watchlist">
                <WatchList userID={userID} />
            </section>
        </div>
    );
}

export default App;
