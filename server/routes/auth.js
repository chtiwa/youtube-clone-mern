const express = require('express')
const router = express.Router()
const { authenticate, checkLogin, logout } = require('../controllers/auth')

router.route('/').post(authenticate)
router.route('/check-login').get(checkLogin)
router.route('/logout').get(logout)

module.exports = router