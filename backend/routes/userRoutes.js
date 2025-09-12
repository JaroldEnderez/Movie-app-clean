const express = require('express');
const {
  registerUser,
  login,
  addFavoriteMovie,
  getFavorites,
  getRecommendations,
  getPreferredGenres,
  addToPreferredGenres,
  removeFromPreferredGenres
} = require('../../api/controllers/UserController');

const router = express.Router();
const auth = require('../../api/middleware/auth');

router.route('/signup').post(registerUser);
router.route('/login').post(login);

router.route('/favorites')
  .post(auth, addFavoriteMovie)
  .get(auth, getFavorites);

router.route('/recommendations').get(auth, getRecommendations);

// Preferred Genres
router.route('/genres')
  .get(auth, getPreferredGenres)       // Get all genres
  .post(auth, addToPreferredGenres)    // Add genres
  .delete(auth, removeFromPreferredGenres); // Remove genre

module.exports = router;
