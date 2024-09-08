const UserModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id, name, lastName, phone, email, role, ordersId) => {
    return jwt.sign({ _id, name, lastName, phone, email, role, ordersId }, process.env.SECRET, { expiresIn: '7d' })
}

const signup = async (req, res) => {

    const { name, lastName, email, password } = req.body

    try {
        const user = await UserModel.signup({ name, lastName, email, password })

        const token = createToken(user._id, name, lastName, user.phone, email, user.role, user.ordersId)

        res.status(200).json({ success: true, message: 'User Created', data: token })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

const signinUser = async (req, res) => {

    const { email, password } = req.body

    try {
        const user = await UserModel.signin({ email, password })

        const token = createToken(user._id, user.name, user.lastName, user.phone, email, user.role, user.ordersId)

        res.status(200).json({ success: true, message: 'User Find', data: token })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }

}

const signinAdmin = async (req, res) => {

    const { email, password } = req.body

    try {
        const user = await UserModel.signin({ email, password })

        if (user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Access denied. Admins only' })
        }

        const token = createToken(user._id, user.name, user.lastName, user.phone, email, user.role, user.ordersId)

        res.status(200).json({ success: true, message: 'User Find', data: token })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }

}

const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({})

        const filterUsers = users.map(user => {
            const { _id, name, lastName, role } = user

            return { _id, name, lastName, role }
        })

        res.status(200).json({ success: true, data: filterUsers })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

module.exports = {
    signup,
    signinUser,
    signinAdmin,
    getAllUsers
}