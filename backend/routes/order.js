const express = require('express')
const { 
    placeOrder, 
    verifyOrder, 
    getUserOrders, 
    listAllOrders, 
    updateStatus,
    cancelOrder
} = require('../controllers/orderController')

const requireAuth = require('../middlewares/requireAuth')
const requireAdmin = require('../middlewares/requireAdmin')

const router = express.Router()

router.post('/place', placeOrder)
router.post('/verify', verifyOrder)
router.post('/userorders', getUserOrders)
router.get('/list', requireAuth, requireAdmin, listAllOrders)
router.patch('/updateStatus/:id', requireAuth, requireAdmin, updateStatus)
router.patch('/cancel/:id', cancelOrder)

module.exports = router