const express = require('express')
const { placeOrder } = require('../controllers/orderController')

const requireAuth = require('../middlewares/requireAuth')
const requireAdmin = require('../middlewares/requireAdmin')

const router = express.Router()

router.post('/place', placeOrder)

module.exports = router