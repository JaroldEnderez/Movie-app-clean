const axios = require('axios');
const config = require('./config/config');

// Get popular movies
const getPopularMovies = async (req, res) => {
    try{
        const response = await axios.get(`${config.tmdbBaseUrl}/movie/popular?api_key=${config.tmdbApiKey}`)
        console.log("TMDB API Response Data:", response.data); // Add this line for debugging
        const movies = response.data.results.map(movie => ({
            ...movie, // Include all original movie properties
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            backdrop: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
        }))

        res.json({
            success:true,
            data: movies
        })
    } catch (error) {
        console.error("Error fetching movies:", error)
        res.status(500).json({
            success: false,
            message: "Error fetching movies",
            error: error.message
        })
    }

}
// Get movie by ID
const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(
            `https://${config.tmdbBaseUrl}/3/movie/${id}?api_key=${config.tmdbApiKey}&language=en-US`
        );
        const movie = {
            id: response.data.id,
            title: response.data.title,
            poster: `https://image.tmdb.org/t/p/w500${response.data.poster_path}`,
            rating: response.data.vote_average,
            overview: response.data.overview,
            release_date: response.data.release_date,
            runtime: response.data.runtime,
            genres: response.data.genres
        };

        res.json({
            success: true,
            data: movie
        });
    } catch (error) {
        console.error('Error fetching movie:', error);
        
        res.status(500).json({
            success: false,
            message: 'Error fetching movie',
            error: error.message
        });
    }
};

// Search movies
const searchMovies = async (req, res) => {
    try {
        const { query } = req.query;
        const response = await axios.get(
            `${config.tmdbBaseUrl}/search/movie?api_key=${config.tmdbApiKey}&language=en-US&query=${query}&page=1`
        );

        const movies = response.data.results.map(movie => ({
            id: movie.id,
            title: movie.title,
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            rating: movie.vote_average,
            overview: movie.overview,
            genre_ids: movie.genre_ids,

        }));

        res.json({
            success: true,
            data: movies
        });
    } catch (error) {
        console.error('Error searching movies:', error);
        res.status(500).json({
            success: false,
            message: 'Error searching movies',
            error: error.message
        });
    }
};

// Get movie genres
const getGenres = async (req, res) => {
    try {
        const response = await axios.get(
            `${config.tmdbBaseUrl}/genre/movie/list?api_key=${config.tmdbApiKey}&language=en-US`
        );

        res.json({
            success: true,
            data: response.data.genres
        });
    } catch (error) {
        console.error('Error fetching genres:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching genres',
            error: error.message
        });
    }
}

module.exports = {
    getPopularMovies,
    getMovieById,
    searchMovies,
    getGenres
}; 