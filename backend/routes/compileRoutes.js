const express = require('express')

const router = express.Router()
const compileController = require('../controllers/compileController')
const protect = require('../middleware/protect.js')

router
    .route('/')
        .post(protect.allProtect, compileController.executeCode)


module.exports = router
