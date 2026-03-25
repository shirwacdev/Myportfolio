const app = require('../backend/src/app')
const connectDatabase = require('../backend/src/config/database')

let dbReady = false

module.exports = async (req, res) => {
  try {
    if (!dbReady) {
      await connectDatabase()
      dbReady = true
    }

    return app(req, res)
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server initialization failed',
    })
  }
}
