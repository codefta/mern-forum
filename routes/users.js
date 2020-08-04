const express = require('express')
const router = express.Router()
const userService = require('../services/userService')

router.get('/', async (req, res, next) => {
  try {
    const users = await userService.getAll()

    res.status(200).json(users)
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await userService.getId(req.params.id)

    res.status(200).json(user)
  } catch (e) {
    next(e)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const body = req.body

    const createdUser = await userService.create(body)

    res.status(201).json(createdUser)
  } catch (e) {
    next(e)
  }
})

module.exports = router
