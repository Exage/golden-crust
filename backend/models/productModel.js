const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

productSchema.statics.addProduct = async function({name, description, price, image, category})  {

    if (!name || !description || !price || !image || !category) {
        throw new Error('All fields must be filled in!')
    }

    const newProduct = await this.create({name, description, price, image, category})

    return newProduct 
}

productSchema.statics.patchProduct = async function(id, body)  {
    const patchedProduct = await this.findOneAndUpdate({_id: id}, {...body})
    
    if (!patchedProduct) {
        throw new Error('No such product')
    }

    return patchedProduct
}

module.exports = mongoose.models.ProductSchema || mongoose.model('Product', productSchema)