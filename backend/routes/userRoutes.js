const express = require('express');
const {registerUser, login, addFavoriteMovie, getFavorites, getRecommendations} = require('../controllers/UserController');
const router = express.Router();
const auth = require('../middleware/auth');

router.route('/signup').post(registerUser);
router.route('/login').post(login);
router.route('/favorites')
  .post(auth, addFavoriteMovie) // Route to add a movie to favorites
  .get(auth, getFavorites);    // Route to get all favorite movies

router.route('/recommendations').get(auth, getRecommendations); // New route for recommendations

module.exports = router;
