const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const movieRoutes = require('./routes/MovieRoutes')
const userRoutes = require('./routes/userRoutes') // Import user routes
const config = require('./config/config')
const mongoose = require('mongoose');


dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/netflix', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ Connection error:', err));

app.use('/api/movies', movieRoutes)
app.use('/api/users', userRoutes) // Register user routes
//app.use('api/genres', )

// 404 Not Found Middleware
app.use((req,res,next) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        error: `Cannot ${req.method} ${req.url}`
    })
})

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    
    // Handle specific types of errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: 'Validation Error',
            error: err.message
        })
    }

    // Default error response
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
    })
})
console.log('Final port being used:', config.port);
console.log('process.env.PORT:', process.env.PORT);

// Start server
const PORT = process.env.PORT || 3001

app.listen(`${PORT}`, console.log(`Server started on PORT ${PORT}`));


