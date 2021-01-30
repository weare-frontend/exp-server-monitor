const router = require('express').Router()
const controllers = require('../../controllers/webhook.controller')

router.post('/', controllers.onHook)
router.get('/random', controllers.onRandom)

module.exports = router
