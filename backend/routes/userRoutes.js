const express = require('express')

const router = express.Router()
const protect = require('../middleware/protect.js')
const userController = require('../controllers/userController')

router
    .route('/')
        .get(protect.allProtect, userController.getAllUsers)

router
    .route('/:uname')
        .get(protect.allProtect, userController.getUserProfile)
        .patch(protect.allProtect, protect.personalProtect, userController.updateUserProfile)
        .delete(protect.allProtect, protect.personalProtect, userController.deleteUser)
        

module.exports = router 