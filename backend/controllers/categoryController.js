const mongoose = require('mongoose')
const CategorySchema = require('../models/categoryModel')

const createCategory = async (req, res) => {
    const body = req.body

    console.log(body)

    try {
        const category = await CategorySchema.createCategory(body)
        res.status(200).json({ message: 'Category successfully added', data: category })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getCategories = async (req, res) => {
    try {
        const category = await CategorySchema.find({})
        res.status(200).json(category)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const patchCategory = async (req, res) => {
    const { id } = req.params
    const body = req.body

    console.log(body)

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Not valid category id' })
    }

    try {
        const product = await CategorySchema.patchCategory(id, body)
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const deleteCategory = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Not valid category id' })
    }

    const category = await CategorySchema.findOneAndDelete({ _id: id })

    if (!category) {
        return res.status(400).json({ message: 'No such category' })
    }

    res.status(200).json(category)
}

module.exports = { createCategory, getCategories, patchCategory, deleteCategory }