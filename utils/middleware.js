const morgan = require('morgan')

morgan.token('body', (req, res) => {
  if (req.method === 'POST' || req.method === 'PUT')
    return JSON.stringify(req.body)
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  console.log(error)

  if (error.name === 'CastError') {
    res.status(400).json({ error: 'malformated id' })
  } else if (error.name === 'ValidationError') {
    res.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebToken') {
    res.status(401).json({ error: 'invalid token' })
  } else if (error.name === 'AuthError') {
    res.status(401).json({ error: error.message })
  }

  next()
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  } else {
    req.token = null
  }

  next()
}

module.exports = {
  morgan,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
}
