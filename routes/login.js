const express = require('express')
const router = express.Router()
const service = require('../services/loginService')

router.post('/', async (req, res, next) => {
  try {
    const userLogged = await service.login(req.body)

    res.status(200).json(userLogged)
  } catch (e) {
    next(e)
  }
})

module.exports = router
