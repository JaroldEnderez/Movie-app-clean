const express = require("express")
const {getPopularMovies, getGenres} = require('../../api/controllers/movieController')
const router = express.Router() 

router.route('/').get(getPopularMovies)
router.route('/genres').get(getGenres)

module.exports = router;