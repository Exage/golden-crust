const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    userId: {
        type: String,
        default: "none"
    },
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    payment: {
        type: Boolean,
        default: false
    }
})

orderSchema.statics.placeOrder = async function ({ userId, name, lastname, items, amount, phone, address }) {
    
    let uid = 'none'

    if (userId) {
        uid = userId
    }
    
    if (!name || !lastname || !items || !amount || !phone || !address) {
        throw new Error('All fields must be filled')
    }

    const newOrder = await this.create({ userId: uid, name, lastname, items, amount, phone, address })

    return newOrder

}

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema)
