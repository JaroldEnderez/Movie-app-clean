require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3001,
  tmdbApiKey: '34fce535e4f4454aec6856021c005d34',
  tmdbBaseUrl: 'https://api.themoviedb.org/3'
}; 