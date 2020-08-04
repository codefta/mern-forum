require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
let NODE_ENV = process.env.NODE_ENV
let JWT_SECRET = process.env.JWT_SECRET

if (NODE_ENV === 'testing') {
  MONGODB_URI = process.env.MONGODB_URI_TEST
}

module.exports = { PORT, MONGODB_URI, NODE_ENV, JWT_SECRET }
