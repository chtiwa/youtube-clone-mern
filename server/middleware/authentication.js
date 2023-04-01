const jwt = require("jsonwebtoken")
const BaseError = require('../errors/base-error')

const auth = async (req, res, next) => {
  try {
    const { token } = req.cookies

    if (!token) {
      throw new BaseError('Unauthorized', 401)
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { userId: payload.userId, username: payload.username }
    next()
  } catch (error) {
    // push it to the error-handler
    next(error)
  }
}

module.exports = auth