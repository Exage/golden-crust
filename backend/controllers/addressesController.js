const mongoose = require('mongoose')
const UserModel = require('../models/userModel')

const addAddress = async (req, res) => {

    const { street, house, flat  } = req.body

    try {

        const address = await UserModel.addAddress({ userId: req.user._id, street, house, flat })

        res.status(200).json({ success: true, message: "Address Add", data: address })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const removeAddress = async (req, res) => {

    const { id } = req.params

    try {

        const address = await UserModel.removeAddress({ userId: req.user._id, addressId: id })

        res.status(200).json({ success: true, message: "Address Removed", data: address })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getAddresses = async (req, res) => {
    try {
        const { addresses } = await UserModel.findOne({ _id: req.user._id })
        res.status(200).json({ success: true, data: addresses })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = {
    addAddress,
    removeAddress,
    getAddresses
}