const express = require('express')
const { 
    addAddress,
    removeAddress,
    getAddresses
} = require('../controllers/addressesController')

const requireAuth = require('../middlewares/requireAuth')

const router = express.Router()

router.post('/add', requireAuth, addAddress)
router.delete('/:id', requireAuth, removeAddress)
router.get('/get', requireAuth, getAddresses)

module.exports = router