const mongoose = require('mongoose')

const schema = mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  username: {
    type: String,
    minlength: 3,
    required: true,
  },
  passwordHash: {
    type: String,
    minglength: 10,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    required: true,
  },
  dateModified: {
    type: Date,
    default: Date.now,
    required: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
})

schema.pre('save', (next) => {
  const now = new Date()
  this.dateModified = now

  if (!this.dateCreated) {
    this.dateCreated = now
  }

  next()
})

schema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
    delete returnedObj.passwordHash
  },
})

module.exports = mongoose.model('User', schema)
