const express = require('express')
// require('express-async-errors')
const app = express()
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const mongoose = require('mongoose')
const helmet = require('helmet')

// Routes Require
const userRouter = require('./routes/users')
const loginRouter = require('./routes/login')
const postRouter = require('./routes/posts')

mongoose
  .connect(config.MONGODB_URI, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
  })
  .then((_result) => {
    console.log('mongodb connected')
  })
  .catch((error) => {
    console.log(`error when connecting mongodb, error: ${error.message}`)
  })

app.use(
  middleware.morgan(
    ':method :url :status :res[content-length] - :response-time ms :body'
  )
)
app.use(helmet())
app.use(express.json())
app.use(middleware.tokenExtractor)

// Routes
app.use('/api/v1/users', userRouter)
app.use('/api/v1/login', loginRouter)
app.use('/api/v1/posts', postRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
