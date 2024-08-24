const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    primaryColor: {
        type: String,
        required: true
    },
    secondaryColor: {
        type: String,
        required: true
    }
})

categorySchema.statics.createCategory = async function ({ name, title, description, primaryColor, secondaryColor }) {
    if (!name || !title || !description || !primaryColor || !secondaryColor) {
        throw new Error('All fields must be filled')
    }

    const newCategory = this.create({ name, title, description, primaryColor, secondaryColor })

    return newCategory
}

categorySchema.statics.patchCategory = async function (id, body) {
    const patchedCategory = await this.findOneAndUpdate({ _id: id }, { ...body }, { new: true })

    if (!patchedCategory) {
        throw new Error('No such category')
    }

    console.log(patchedCategory)

    return patchedCategory
}

module.exports = mongoose.model('Category', categorySchema)