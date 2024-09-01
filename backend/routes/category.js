const express = require('express')
const { createCategory, getCategories, patchCategory, deleteCategory } = require('../controllers/categoryController')

const requireAuth = require('../middlewares/requireAuth')
const requireAdmin = require('../middlewares/requireAdmin')

const router = express.Router()

router.post('/', requireAuth, requireAdmin, createCategory)
router.get('/', getCategories)
router.patch('/:id', requireAuth, requireAdmin, patchCategory)
router.delete('/:id', requireAuth, requireAdmin, deleteCategory)

module.exports = router