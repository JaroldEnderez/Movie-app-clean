const express = require("express")
const {getPopularMovies, getGenres, getMovieById, getMovieVideos} = require('../controllers/movieController')
const router = express.Router() 

router.route('/').get(getPopularMovies)
router.route('/genres').get(getGenres)
router.route('/:id').get(getMovieById)
router.route('/:id/videos').get(getMovieVideos)

module.exports = router;