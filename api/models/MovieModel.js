const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  tmdbId: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  overview: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  genre_ids: [{
    type: Number
  }],
  release_date: {
    type: Date
  },
  runtime: {
    type: Number
  },
  trailer_key: {
    type: String
  },
  cast: [{
    name: String,
    character: String,
    profile_path: String
  }],
  director: {
    type: String
  },
  budget: {
    type: Number
  },
  revenue: {
    type: Number
  },
  user_ratings: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    review: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  average_user_rating: {
    type: Number,
    default: 0
  },
  total_ratings: {
    type: Number,
    default: 0
  },
  watch_count: {
    type: Number,
    default: 0
  },
  favorite_count: {
    type: Number,
    default: 0
  },
  last_updated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better search performance
movieSchema.index({ title: 'text', overview: 'text' });
movieSchema.index({ tmdbId: 1 });
movieSchema.index({ genre_ids: 1 });
movieSchema.index({ rating: -1 });

// Method to calculate average rating
movieSchema.methods.calculateAverageRating = function() {
  if (this.user_ratings.length === 0) return 0;
  
  const totalRating = this.user_ratings.reduce((sum, rating) => sum + rating.rating, 0);
  this.average_user_rating = totalRating / this.user_ratings.length;
  this.total_ratings = this.user_ratings.length;
  return this.average_user_rating;
};

// Static method to find popular movies
movieSchema.statics.findPopular = function(limit = 20) {
  return this.find()
    .sort({ watch_count: -1, average_user_rating: -1 })
    .limit(limit);
};

// Static method to find movies by genre
movieSchema.statics.findByGenre = function(genreId, limit = 20) {
  return this.find({ genre_ids: genreId })
    .sort({ rating: -1 })
    .limit(limit);
};

// Static method to search movies
movieSchema.statics.searchMovies = function(query, limit = 20) {
  return this.find({
    $text: { $search: query }
  })
  .sort({ score: { $meta: "textScore" } })
  .limit(limit);
};

module.exports = mongoose.model('Movie', movieSchema); 