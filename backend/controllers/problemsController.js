const Problem  = require('../models/problemModel')
const TestCase = require('../models/testCaseModel')

exports.getAllProblems = async (req, res, next) => {
    try {
        const problems = await Problem.find().select('name tags difficulty numberOfSolves')
        return res.status(200).json(problems)
    }
    catch(e) {
        console.log(e.message);
        return res.status(404).json({
            result: "fail"
        })
    }
}

exports.addProblem = async (req, res, next) => {
    try {
        const {name, statement, tags, difficulty, sampleInput, sampleOutput} = req.body;

        await Problem.create({
            name: name,
            statement: statement,
            tags: tags,
            difficulty: difficulty, 
            sampleInput: sampleInput,
            sampleOutput: sampleOutput
        })
        return res.status(200).json({
            result: "success"
        })
    }
    catch(e) {
        console.log(e.message);
        return res.status(404).json({
            result: "fail"
        })
    }
}

exports.getProblemByID = async (req, res, next) => {
    try {
        const problemID = req.params.id;
        const problem = await Problem.findById(problemID).select('name statement tags difficulty sampleInput sampleOutput');
        if(!problem) {
            return res.status(404).json({
                result: "fail",
                message: "problem not found"
            })
        }
        return res.status(200).json(problem)

    }
    catch(e) {
        console.log(e.message);
        return res.status(404).json({
            result: "fail"
        })
        
    }
}

exports.deleteProblem = async (req, res, next) => {
    try {
        const problemID = req.params.id;
        await Problem.findByIdAndDelete(problemID);
        return res.status(200).json({
            result: "success" 
        })

    }
    catch(e) {
        console.log(e.message);
        return res.status(404).json({
            result: "fail"
        })
        
    }
}

exports.updateProblem = async (req, res, next) => {
    try {
        const problemID = req.params.id;
        const params = req.body;
        await Problem.findOneAndUpdate({_id: problemID}, params, {new: true})
        return res.status(200).json({
            result: "success"
        })    
    }
    catch(e) {
        console.log(e.message);
        return res.status(404).json({
            result: "fail"
        })
    }

}

exports.addTestCase = async(req, res, next) => {
    try {
        const problemID = req.params.id;
        const {testCaseInput, testCaseOutput} = req.body;
        await TestCase.create({
            testCaseInput: testCaseInput,
            testCaseOutput: testCaseOutput,
            problemID: problemID
        }) 
        return res.status(200).json({
            status: "sucess",
            message: "testcase added successfully"
        })        
    }
    catch(e) {
        console.log(e.message);
        return res.status(404).json({
            result: "fail"
        })
    }
}