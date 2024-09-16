const express = require('express')
const { 
    signup,
    signinUser,
    signinAdmin,
    googleAuth,
    getAllUsers,
    updatePhone,
    updateName
} = require('../controllers/userController')

const requireAuth = require('../middlewares/requireAuth')
const requireAdmin = require('../middlewares/requireAdmin')

const router = express.Router()

router.post('/signup', signup)
router.post('/login', signinUser)
router.post('/googleauth', googleAuth)
router.post('/admin/login', signinAdmin)
router.post('/setphone', requireAuth, updatePhone)
router.post('/setname', requireAuth, updateName)

router.get('/admin/list', requireAuth, requireAdmin, getAllUsers)

module.exports = router