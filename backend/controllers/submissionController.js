const Problem = require('../models/problemModel')
const Submission = require('../models/submissionModel')
const User = require('../models/userModel')
const TestCase = require('../models/testCaseModel');
const { executeCode } = require('./compileController');
const webSocketManager = require('../websocketmanager/webSocketManager');
const {CODE_COMPILATION_FAILED,
    CODE_TC_FAILED,
    CODE_SERVER_ERROR} = require('../config/config')

exports.loadSubmitPage = async (req, res, next) => {
    try {
        const problemID = req.params.id;
        const problem = await Problem.findById(problemID).select('name')
        return res.status(200).json(problem)
    }
    catch(e) {
        console.log(e.message);
        return res.status(404).json({
            result: "fail",
            message: "submission failed"
        })
    }
}

exports.submitSolution = async (req, res, next) => {
    try {
        const problemID = req.params.id;
        const {language, code, sessionID } = req.body;
        const username = req.user

        if(problemID == undefined || language == undefined || code == undefined || username == undefined ) {
            return res.status(404).json({
             result: "fail",
             message: "something went wrong"
            })
        }

        const problem  = await Problem.findById(problemID).select('name')
        const problemName = problem.name
        req.body.isSubmission = true
        const testcases = await TestCase.find({problemID: problemID})
        if(testcases == undefined || testcases.length == 0) {
            return res.status(404).json({
                result: "fail",
                message: "no test cases found"
            })
        }
        let testDetails = []
        for(let i=0; i<testcases.length; i++) {
            webSocketManager.sendMessage(sessionID, `Running on Test Case ${i+1}`);
            req.body.input = testcases[i].testCaseInput;
            req.body.output = testcases[i].testCaseOutput;
            try {
                let result = await executeCode(req, res, next);
                testDetails.push ({
                    testNumber: i+1,
                    timeTaken: result.timeTaken
                })
                if(result.code == CODE_SERVER_ERROR) {
                    throw Error("Server error")
                }  
                else if(result.code == CODE_COMPILATION_FAILED) {
                    throw Error("Compilation Error")
                }
                else if(result.code == CODE_TC_FAILED) {
                    throw Error("Wrong Answer on Test Case " + (i+1).toString())
                }
            }
            catch(e) {
                if(e.message == "Server error"){
                    return res.status(404).json({
                        result: "fail",
                        message: "Server error",
                    })
                }
                let verdict = e.message
                const submission = await Submission.create({
                    submitterUserName: username,
                    problemID: problemID,
                    problemName: problemName,
                    language: language,
                    code: code,
                    verdict: verdict,
                    testDetails: testDetails
                })
                await User.findOneAndUpdate({_id: req.userid}, {$inc: {numberOfSubmissions: 1}}, {new: true})
                return res.status(200).json({
                    result: "success",
                    message: verdict,
                    verdict: 0,
                    submissionID: submission._id
                })
            }
        }

        //TODO: Can optimise this process of searching for a problem ID in an array of problems solved by the user
        const user = await User.findOne({_id: req.userid})
        let hasSolvedBefore = false
        for(let i = 0; i<user.problemsSolved.length; i++) {
            if(user.problemsSolved[i] == problemID) {
                hasSolvedBefore = true;
                break;
            }
        }
        if(hasSolvedBefore) {
            await User.findOneAndUpdate({_id: req.userid}, {$inc: {numberOfSubmissions: 1}})
        }
        else {
            await User.findOneAndUpdate({_id: req.userid}, {$inc: {numberOfSubmissions: 1, numberOfSolves: 1}, $push: {problemsSolved: problemID}})
            await Problem.findOneAndUpdate({_id: problemID}, {$push: {solvers: username}, $inc: {numberOfSolves: 1} })
        }
        
        const submission = await Submission.create({
            submitterUserName: username,
            problemID: problemID,
            problemName: problemName,
            language: language,
            code: code,
            verdict: "Accepted",
            testDetails: testDetails
        })
        return res.status(200).json({
            result: "success",
            message: "testcases passed",
            verdict: 1,
            submissionID: submission._id
        })
        
    }
    catch(e) {
        console.log(e.message);
        return res.status(404).json({
            result: "fail",
            message: "something went wrong"
        })
    }
}

exports.loadAllSubmissions = async (req, res, next) => {
    try {
        const submissions = await Submission.find().select('-code').sort({submissionTime: -1});
        return res.status(200).json(submissions)    
    }
    catch(e) {
        console.log(e.message);
        return res.status(404).json({
            result: "fail",
            message: "fetch failed"
        })
    }
}

exports.loadSubmissionsByProblemID = async (req, res, next) => {
    const problemID = req.params.id
    try {
        const problem = await Problem.findOne({_id: problemID});
        if(problem == undefined) {
            return res.status(404).json({
                result: "fail",
                message: "no such problem exists"
            })
        }
        const submissions = await Submission.find({problemID: problemID}).select('-code').sort({submissionTime: -1});
        return res.status(200).json(submissions)
        
    }
    catch(e) {
        console.log(e.message);
        return res.status(404).json({
            result: "fail",
            message: "fetching submissions failed"
        })
    }
}
exports.getSubmissionByID = async (req, res, next) => {
    const submissionID = req.params.sid

    try  {
        const submission = await Submission.findOne({_id:submissionID})
        if(submission == undefined) {
            return res.status(404).json({
                result: "fail",
                message: "no such solution exists"
            })
        }
        return res.status(200).json(submission)
    }
    catch(e) {
        console.log(e.message);
        return res.status(404).json({
            result: "fail",
            message: "fetching submissions failed"
        })
    }
}