const express = require('express')
const multer = require('multer')
const { 
    addProduct, 
    listProducts, 
    patchProduct,
    deleteProduct 
} = require('../controllers/productController')

const router = express.Router()

// store images

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage })

router.post('/add', upload.single('image'), addProduct)
router.get('/list', listProducts)
router.patch('/patch/:id', patchProduct)
router.delete('/delete/:id', deleteProduct)

module.exports = router