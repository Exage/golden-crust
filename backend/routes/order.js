const express = require('express')
const { placeOrder, verifyOrder, getUserOrders } = require('../controllers/orderController')

const requireAuth = require('../middlewares/requireAuth')
const requireAdmin = require('../middlewares/requireAdmin')

const router = express.Router()

router.post('/place', placeOrder)
router.post('/verify', verifyOrder)
router.get('/userorders', requireAuth, getUserOrders)

module.exports = router