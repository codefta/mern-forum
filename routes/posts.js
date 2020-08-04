const express = require('express')
const postService = require('../services/postService')
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const posts = await postService.getAll()
    res.status(200).json(posts)
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const post = await postService.getId(req.params.id)
    res.status(200).json(post)
  } catch (e) {
    next(e)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const postCreated = await postService.create(req.body, req.token)
    res.status(201).json(postCreated)
  } catch (e) {
    next(e)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const postUpdated = await postService.update(
      req.params.id,
      req.body,
      req.token
    )
    res.status(201).json(postUpdated)
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const postDeleted = await postService.remove(req.params.id, req.token)
    res.status(204).json(postDeleted)
  } catch (e) {
    next(e)
  }
})

router.get('/:id/likes', async (req, res, next) => {
  try {
    const postLiked = await postService.like(req.params.id, req.token)
    res.status(200).json(postLiked)
  } catch (e) {
    next(e)
  }
})

router.post('/:id/comments', async (req, res, next) => {
  try {
    const postCommented = await postService.comment(
      req.params.id,
      req.body,
      req.token
    )

    res.status(200).json(postCommented)
  } catch (e) {
    next(e)
  }
})

module.exports = router
