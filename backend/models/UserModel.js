const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please add name"]
    },
    email:{
        type: String,
        required: [true, "Please add email"],
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please use a valid email address",
        ],
    },
    password: {
        type: String, 
        required: [true, "Please add password"],
        minLength: [6, "Password must be at least 6 characters long"]
    },

    watchLater: [
        String
    ],

    browsed: [
        String
    ],
},

    {timestamps: true}

)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next(); // Only hash the password if it's new or modified
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;