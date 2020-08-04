const Post = require('../models/post')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const getAll = async () => {
  const posts = await Post.find({})
    .populate('author', {
      username: 1,
      name: 1,
    })
    .populate({
      path: 'comments',
      select: ['content', 'commenter'],
      populate: { path: 'commenter', select: 'name' },
    })
    .populate('likes', {
      username: 1,
      name: 1,
    })

  return posts.map((p) => p.toJSON())
}

const getId = async (id) => {
  const post = await Post.findById(id)
    .populate('author', {
      username: 1,
      name: 1,
    })
    .populate({
      path: 'comments',
      select: ['content', 'commenter'],
      populate: { path: 'commenter', select: 'name' },
    })
    .populate('likes', {
      username: 1,
      name: 1,
    })

  return post.toJSON()
}

const create = async (obj, token) => {
  const decodedToken = jwt.verify(token, config.JWT_SECRET)
  console.log(token)

  if (!token || !decodedToken.id) {
    throw { name: 'JsonWebToken', error: 'token missing or invalid' }
  }

  const user = await User.findById(decodedToken.id)

  const post = new Post({
    title: obj.title,
    content: obj.content,
    author: user._id,
  })

  const postSaved = await post.save()
  user.posts.concat(postSaved.id)
  await user.save()

  const postFound = await Post.findById(postSaved.id)
    .populate('author', {
      username: 1,
      name: 1,
    })
    .populate({
      path: 'comments',
      select: ['content', 'commenter'],
      populate: { path: 'commenter', select: 'name' },
    })
    .populate('likes', {
      username: 1,
      name: 1,
    })

  return postFound.toJSON()
}

const update = async (id, obj, token) => {
  const decodedToken = jwt.verify(token, config.JWT_SECRET)

  if (!token || !decodedToken.id) {
    throw { name: 'JsonWebToken', error: 'token missing or invalid' }
  }

  const post = await Post.findById(id)

  if (post.author.toString() !== decodedToken.id) {
    throw { name: 'JsonWebToken', error: 'invalid user' }
  }

  const postToUpdate = {
    title: obj.title,
    content: obj.content,
  }

  const postUpdated = await Post.findByIdAndUpdate(id, postToUpdate, {
    new: true,
  })

  const postFound = await Post.findById(postUpdated.id)
    .populate('author', {
      username: 1,
      name: 1,
    })
    .populate({
      path: 'comments',
      select: ['content', 'commenter'],
      populate: { path: 'commenter', select: 'name' },
    })
    .populate('likes', {
      username: 1,
      name: 1,
    })

  return postFound.toJSON()
}

const remove = async (id, token) => {
  const decodedToken = jwt.verify(token, config.JWT_SECRET)

  if (!token || !decodedToken.id) {
    throw { name: 'JsonWebToken', error: 'token missing or invalid' }
  }

  const post = await Post.findById(id)

  if (post.author.toString() !== decodedToken.id) {
    throw { name: 'JsonWebToken', error: 'invalid user' }
  }

  return await Post.findByIdAndDelete(id)
}

const comment = async (id, obj, token) => {
  const decodedToken = jwt.verify(token, config.JWT_SECRET)

  if (!token || !decodedToken.id) {
    throw { name: 'JsonWebToken', error: 'token missing or invalid' }
  }

  const user = await User.findById(decodedToken.id)
  const post = await Post.findById(id)

  const comment = new Comment({
    content: obj.content,
    commenter: user._id,
    post: post._id,
  })

  const commentSaved = await comment.save()
  post.comments = post.comments.concat(commentSaved.id)
  const postSaved = await post.save()

  const postFound = await Post.findById(postSaved.id)
    .populate('author', { username: 1, name: 1 })
    .populate({
      path: 'comments',
      select: ['content', 'commenter'],
      populate: { path: 'commenter', select: 'name' },
    })
    .populate('likes', {
      username: 1,
      name: 1,
    })

  return postFound.toJSON()
}

const like = async (id, token) => {
  const decodedToken = jwt.verify(token, config.JWT_SECRET)

  if (!token || !decodedToken.id) {
    throw { name: 'JsonWebToken', error: 'token missing or invalid' }
  }

  const user = await User.findById(decodedToken.id)
  const post = await Post.findById(id)

  if (post.likes.includes(user._id)) {
    const newLikes = post.likes.filter((userLike) => {
      return userLike.toString() !== user._id.toString()
    })

    post.likes = newLikes

    const postUpdated = await Post.findByIdAndUpdate(post._id, post, {
      new: true,
    })

    const postFinded = await Post.findById(postUpdated.id)
      .populate('author', {
        username: 1,
        name: 1,
      })
      .populate({
        path: 'comments',
        select: ['content', 'commenter'],
        populate: { path: 'commenter', select: 'name' },
      })

    return postFinded.toJSON()
  }

  post.likes = post.likes.concat(user._id)
  const postSaved = await post.save()
  const postFound = await Post.findById(postSaved.id)
    .populate('author', { username: 1, name: 1 })
    .populate({
      path: 'comments',
      select: ['content', 'commenter'],
      populate: { path: 'commenter', select: 'name' },
    })
    .populate('likes', {
      username: 1,
      name: 1,
    })

  return postFound.toJSON()
}

module.exports = {
  getAll,
  getId,
  create,
  update,
  remove,
  comment,
  like,
}
