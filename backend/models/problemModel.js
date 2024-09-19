const mongoose = require('mongoose')

const problemSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        unique: true
    },
    statement: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    difficulty: {
        type: String, 
        required: true
    },
    sampleInput: {
        type : String,
        required: true
    },
    sampleOutput: {
        type : String,
        required: true
    },
    numberOfSolves: {
        type: Number,
        default: 0
    },
    solvers: {
        type: [String],
        default: []    
    }
})

const Problem = mongoose.model("Problem", problemSchema)

module.exports = Problem