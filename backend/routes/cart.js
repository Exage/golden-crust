const express = require('express')
const {
    addItem,
    substractItem,
    removeItem,
    removeAllItems,
    getBag
} = require('../controllers/cartController')

const requireAuth = require('../middlewares/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.post('/add/:id', addItem)
router.post('/substract/:id', substractItem)
router.delete('/:id', removeItem)
router.post('/removeAll', removeAllItems)
router.get('/', getBag)

module.exports = router