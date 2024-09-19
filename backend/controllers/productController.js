const mongoose = require('mongoose')
const ProductModel = require('../models/productModel')
const fs = require('fs')
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const crypto = require('crypto')

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const addProduct = async (req, res) => {

    const { name, description, price, category } = req.body
    const file = req.file

    if (!file) {
        return res.status(400).json({ success: false, message: 'File is not defined' })
    }

    const image = randomImageName()

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${image}`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
    }

    const command = new PutObjectCommand(params)
    await s3.send(command)

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
            const deleteParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `uploads/${existingProduct.image}`
            }
            const deleteCommand = new DeleteObjectCommand(deleteParams)
            await s3.send(deleteCommand)

            const newImageName = randomImageName()

            const uploadParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `uploads/${newImageName}`,
                Body: req.file.buffer,
                ContentType: req.file.mimetype
            }
            const uploadCommand = new PutObjectCommand(uploadParams)
            await s3.send(uploadCommand)

            body = { ...body, image: newImageName }
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

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${product.image}`
    }

    const command = new DeleteObjectCommand(params)
    await s3.send(command)

    res.status(200).json({ success: true, message: `Product "${product.name} (${product._id})" successfully deleted`, data: product })
}

module.exports = {
    addProduct,
    listProducts,
    updateProduct,
    deleteProduct
}