const User = require('../models/User')
// const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken')
const asyncWrapper = require('../middleware/async-wrapper')
const BaseError = require('../errors/base-error')

// onGoogleSuccess
const authenticate = asyncWrapper(async (req, res) => {
  const { email } = req.body
  if (!email) {
    throw new BaseError('Email must be provided', 400)
  }

  const user = await User.findOne({ email: email })

  if (user) {
    const token = user.createJWT()
    return res.status(200)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 10, // 10 days
        sameSite: 'lax'
      })
      .json({ success: true, user: user, isLoggedIn: true })
  }

  // username email imageUrl 
  const newUser = await User.create({ ...req.body })
  const newToken = newUser.createJWT()
  res.status(200)
    .cookie("token", newToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 10, // 10 days
      sameSite: 'lax'
    })
    .json({ success: true, user: newUser, isLoggedIn: true })
})

const checkLogin = asyncWrapper(async (req, res) => {
  const { token } = req.cookies

  if (!token) {
    // the user is not logged in or the cookie has expired
    return res.status(200).json({ success: true, isLoggedIn: false })
  }

  const { username, imageUrl, userId } = jwt.verify(token, process.env.JWT_SECRET)
  res.status(200).json({ success: true, isLoggedIn: true, username: username, imageUrl: imageUrl, userId: userId })
})

const logout = asyncWrapper(async (req, res) => {
  res
    .cookie("token", "", { maxAge: 0 })
    .status(200).json({ success: true, message: "Logged out successfully", isLoggedIn: false })
})

module.exports = { logout, authenticate, checkLogin }