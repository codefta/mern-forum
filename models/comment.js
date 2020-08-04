const mongoose = require('mongoose')

const schema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  commenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
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
  },
})

module.exports = mongoose.model('Comment', schema)
