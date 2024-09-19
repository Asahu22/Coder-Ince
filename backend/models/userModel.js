const mongoose = require('mongoose')

const userSchema  = new mongoose.Schema({
    username: {
        type: String,
        required : [true, "Must provide a username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Must provide an email"],
        unique: true
    },
    password: {
        type: String, 
        required : [true, "Must provide a password"]
    },
    role: {
        type: String,
        default: "user"
    },
    numberOfSolves: {
        type: Number,
        default: 0
    },
    numberOfSubmissions: {
        type: Number,
        default: 0        
    },
    problemsSolved: {
        type: [String],
        default: []
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User