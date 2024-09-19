const express = require('express')

const router = express.Router()

const validateController = require('../controllers/validateController')

router
    .route('/')
        .get(validateController.validateToken)

module.exports = router 