const mongoose = require('mongoose')

const connectDatabase = async () => {
  const mongoUri = process.env.MONGO_URI

  if (!mongoUri) {
    throw new Error('MONGO_URI is not defined. Add it to your environment variables.')
  }

  await mongoose.connect(mongoUri, {
    dbName: process.env.MONGO_DB_NAME || undefined,
  })

  console.log(`MongoDB connected: ${mongoose.connection.host}`)
}

module.exports = connectDatabase
