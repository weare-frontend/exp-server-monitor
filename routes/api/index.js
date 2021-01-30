const router = require('express').Router()
const auth = require('../auth')

router.use('/users', require('./user'))
router.use('/webhook', require('./webhook'))

module.exports = router
