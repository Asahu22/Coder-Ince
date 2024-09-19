const express = require('express')

const router = express.Router()
const protect = require('../middleware/protect.js')
const problemsController = require('../controllers/problemsController')

router
    .route('/')
        .get(protect.allProtect, problemsController.getAllProblems)
        .post(protect.allProtect, protect.adminProtect, problemsController.addProblem)
    
router
    .route('/:id')
        .get(protect.allProtect, problemsController.getProblemByID)
        .delete(protect.allProtect, protect.adminProtect, problemsController.deleteProblem)
        .patch(protect.allProtect, protect.adminProtect, problemsController.updateProblem)

router
    .route('/:id/addtc')
        .post(protect.allProtect, protect.adminProtect, problemsController.addTestCase)

module.exports = router 