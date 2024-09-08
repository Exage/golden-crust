const mongoose = require('mongoose')
const UserModel = require('../models/userModel')
const ProductModel = require('../models/productModel')

const addItem = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Not valid product id' })
    }

    const product = await ProductModel.findById(id)

    if (!product) {
        return res.status(404).json({ success: false, message: "No such product" })
    }

    try {
        const user = await UserModel.findOne({ _id: req.user._id })
        const bagData = await user.bagData

        if (bagData[id]) {
            bagData[id] += 1
        } else {
            bagData[id] = 1
        }

        await UserModel.findByIdAndUpdate(req.user._id, { bagData }) 

        res.status(200).json({ success: true, message: "Item Added", data: bagData })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

const substractItem = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Not valid product id' })
    }

    const product = await ProductModel.findById(id)

    if (!product) {
        return res.status(404).json({ success: false, message: "No such product" })
    }

    try {
        const user = await UserModel.findOne({ _id: req.user._id })
        const bagData = await user.bagData

        if (bagData[id]) {
            if (bagData[id] > 1) {
                bagData[id] -= 1
            } else {
                delete bagData[id]
            }
        }

        await UserModel.findByIdAndUpdate(req.user._id, { bagData }) 

        res.status(200).json({ success: true, message: "Item Substracted", data: bagData })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

const removeItem = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Not valid product id' })
    }

    const product = await ProductModel.findById(id)

    if (!product) {
        return res.status(404).json({ success: false, message: "No such product", data: bagData })
    }

    try {
        const user = await UserModel.findOne({ _id: req.user._id })
        const bagData = await user.bagData

        if (bagData[id]) {
            delete bagData[id]
        }

        await UserModel.findByIdAndUpdate(req.user._id, { bagData }) 

        res.status(200).json({ success: true, message: "Item Removed", data: bagData })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

const removeAllItems = async (req, res) => {
    console.log('123')
    try {
        const bagData = {}
        await UserModel.findByIdAndUpdate(req.user._id, { bagData }) 

        res.status(200).json({ success: true, message: "All items removed", data: bagData })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

const getBag = async (req, res) => {

    const { items } = req.body

    try {
        const user = await UserModel.findOne({ _id: req.user._id })
        const bagData = await user.bagData

        if (items) {
            const mergedBag = Object.assign({}, bagData, items)
            const userUpdated = await UserModel.findOneAndUpdate(req.user._id, { bagData: mergedBag }, { new: true })
            const bagUpdated = await userUpdated.bagData
            
            return res.status(200).json({ success: true, data: bagUpdated, merged: true })
        }

        res.status(200).json({ success: true, data: bagData })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

module.exports = {
    addItem,
    substractItem,
    removeItem,
    removeAllItems,
    getBag
}