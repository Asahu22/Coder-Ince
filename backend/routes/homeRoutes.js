const express = require('express')

const router = express.Router()
const homeController = require('../controllers/homeController')
const authController = require('../controllers/authController')
const protect = require('../middleware/protect.js')

router
    .route('/')
        .get(protect.allProtect, homeController.getHomePage)

router
    .route('/register')
        .post(authController.registerUser, homeController.getHomePage)
    
router
    .route('/login') 
        .post(authController.loginUser, homeController.getHomePage)

router
    .route('/logout')
        .get(authController.logoutUser)

module.exports = router 