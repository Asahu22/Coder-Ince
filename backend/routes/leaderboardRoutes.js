const express = require('express')

const router = express.Router()

const protect = require('../middleware/protect.js')
const leaderboardController = require('../controllers/leaderboardController')

router
    .route('/')
        .get(protect.allProtect, leaderboardController.getRankings)

module.exports = router 