const express = require('express')
const multer = require('multer')
const { 
    addProduct, 
    listProducts, 
    updateProduct,
    deleteProduct 
} = require('../controllers/productController')

const requireAuth = require('../middlewares/requireAuth')
const requireAdmin = require('../middlewares/requireAdmin')

const router = express.Router()

// store images

const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post('/add', requireAuth, requireAdmin, upload.single('image'), addProduct)
router.get('/list', listProducts)
router.patch('/:id', requireAuth, requireAdmin, upload.single('image'), updateProduct)
router.delete('/delete/:id', requireAuth, requireAdmin, deleteProduct)

module.exports = router