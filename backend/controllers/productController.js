const mongoose = require('mongoose')
const ProductModel = require('../models/productModel')
const fs = require('fs')

const addProduct = async (req, res) => {

    const { name, description, price, category } = req.body

    let image = `${req.file.filename}`

    try {
        const product = await ProductModel.addProduct({ name, description, price, category, image })
        res.status(200).json({ success: true, message: 'Product Added', data: product })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

const listProducts = async (req, res) => {
    try {
        const products = await ProductModel.find({})
        res.status(200).json({ success: true, data: products })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params
    let body = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Not valid product id' })
    }

    try {
        const existingProduct = await ProductModel.findById(id)
        if (!existingProduct) {
            return res.status(404).json({ success: false, message: 'No such product' })
        }

        if (req.file) {
            fs.unlink(`uploads/${existingProduct.image}`, () => { })
            body = { ...body, image: req.file.filename }
        }

        const updatedProduct = await ProductModel.updateProduct(id, body)
        res.status(200).json({
            success: true,
            data: updatedProduct,
            message: `Product "${updatedProduct.name} (${updatedProduct._id})" successfully updated`
        })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Not valid product id' })
    }

    const product = await ProductModel.findOneAndDelete({ _id: id })

    if (!product) {
        return res.status(400).json({ success: false, message: 'No such product' })
    }

    fs.unlink(`uploads/${product.image}`, () => { })

    res.status(200).json({ success: true, message: `Product "${product.name} (${product._id})" successfully deleted`, data: product })
}

module.exports = {
    addProduct,
    listProducts,
    updateProduct,
    deleteProduct
}