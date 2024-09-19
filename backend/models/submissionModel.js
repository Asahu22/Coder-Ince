const mongoose = require('mongoose')

const submissionSchema = new mongoose.Schema({
    submitterUserName: {
        type: String, 
        required: true
    },
    problemID: {
        type: String,
        required: true
    }, 
    problemName: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
    },
    submissionTime: {
        type: Date,
        default: Date.now
    },
    verdict: {
        type: String, 
        required: true
    } ,
    testDetails: [{
        testNumber: {
            type: Number,
            required: true
        },
        timeTaken: {
            type: Number,
            required: true
        }
    }]
})

const Submission = mongoose.model("Submission", submissionSchema)

module.exports = Submission