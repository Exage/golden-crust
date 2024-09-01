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

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const maxSize = 2 * 1024 * 1024

const upload = multer({ storage, limits: { fileSize: maxSize } })

router.post('/add', requireAuth, requireAdmin, upload.single('image'), addProduct)
router.get('/list', listProducts)
router.patch('/:id', requireAuth, requireAdmin, upload.single('image'), updateProduct)
router.delete('/delete/:id', requireAuth, requireAdmin, deleteProduct)

module.exports = router