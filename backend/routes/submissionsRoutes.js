const express = require('express')

const router = express.Router()
const protect = require('../middleware/protect.js')
const submissionsController = require('../controllers/submissionController')


router
    .route('/:id/submit')
        .get(protect.allProtect, submissionsController.loadSubmitPage)
        .post(protect.allProtect, submissionsController.submitSolution)

router
    .route('/submissions')
        .get(protect.allProtect, submissionsController.loadAllSubmissions)

router
    .route('/:id/submissions')
        .get(protect.allProtect, submissionsController.loadSubmissionsByProblemID)

router
    .route('/submissions/:sid')
        .get(protect.allProtect, submissionsController.getSubmissionByID)

module.exports = router