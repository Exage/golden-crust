const express = require('express')
const { createCategory, getCategories, patchCategory, deleteCategory } = require('../controllers/categoryController')

const router = express.Router()

router.post('/', createCategory)
router.get('/', getCategories)
router.patch('/:id', patchCategory)
router.delete('/:id', deleteCategory)

module.exports = router