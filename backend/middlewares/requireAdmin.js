const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAdmin = async (req, res, next) => {

    if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' })
    }

    try {
        const user = await User.findOne({ _id: req.user._id }).select('role')

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only' })
        }
        
        next()
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }

}

module.exports = requireAdmin