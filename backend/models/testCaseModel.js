const mongoose = require('mongoose')

const testCaseSchema = new mongoose.Schema({

    testCaseInput: {
        type: String, 
        required: true
    },
    testCaseOutput: {
        type: String, 
        required: true
    },
    problemID: {
        type: String, 
        required: true
    }
})

const TestCase = mongoose.model("Test Case", testCaseSchema)

module.exports = TestCase