const bcrypt = require("bcryptjs")
const asyncHandler = require('express-async-handler')
const generateToken = require('../config/generateToken'); // Import generateToken
const User = require("../models/UserModel")

const registerUser = asyncHandler(async(req , res ) => {
    try{
        const {username, email, password} = req.body;
        console.log("Req body: ", req.body)

        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({msg: "Email already exists"});

        const newUser = new User({
            username,
            email,
            password: password,
            favorites: [],
            browsed: []
        });

        await newUser.save();

        const token = generateToken(newUser._id); // Use generateToken
        res.json({ token, user: { id: newUser._id, username, email } });
    } catch(err){
        res.status(500).json({error: err.message});
    }
})

const login = asyncHandler(async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      let isMatch = false;
  
      if (user) {
        isMatch = await user.matchPassword(password);
      }
  
      // Always return a response with debug info, even on failure
      if (!user) {
        return res.status(400).json({
          msg: "User not found",
          debug: {
            reqBody: req.body,
            user: null,
            passwordInput: password,
          },
        });
      }
  
      if (!isMatch) {
        return res.status(400).json({
          msg: "Invalid credentials",
          debug: {
            reqBody: req.body,
            user: {
              id: user._id,
              email: user.email,
              storedHash: user.password,
            },
            passwordInput: password,
            compareResult: isMatch,
          },
        });
      }
  
      const token = generateToken(user._id);
  
      return res.json({
        token,
        user: { id: user._id, username: user.username, email: user.email },
        debug: {
          reqBody: req.body,
          userEmail: user.email,
          passwordInput: password,
          storedHash: user.password,
          compareResult: isMatch,
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  

const addFavoriteMovie = asyncHandler(async (req, res) => {
    try {
        const { movieId } = req.body;
        const userId = req.user; // User ID from auth middleware

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        if (!user.favorites.includes(movieId)) {
            user.favorites.push(movieId);
            await user.save();
            res.status(200).json({ msg: "Movie added to favorites", favorites: user.favorites });
        } else {
            res.status(400).json({ msg: "Movie already in favorites" });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const getFavorites = asyncHandler(async(req, res) => {
    try{
        const userId = req.user
        const user = await User.findById(userId)

        if(!user){
            return res.status(404).json({msg:"User not found"})
        }

        res.status(200).json({favorites: user.favorites})
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

const getRecommendations = asyncHandler(async(req, res) => {
    try {
        res.status(200).json({msg: "Recommendations feature coming soon!"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})

module.exports = {registerUser, login, addFavoriteMovie, getFavorites, getRecommendations}