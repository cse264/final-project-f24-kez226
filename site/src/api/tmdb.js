
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Utility function to shuffle an array
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export const fetchMovies = async (endpoint) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
        const data = await response.json();
        return shuffleArray(data.results); // Randomize the results before returning
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
};

export const getImageUrl = (path, size = "w500") => `https://image.tmdb.org/t/p/${size}${path}`;
