const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    uuid: {
        type: String,
        default: "",
        required: true
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
    deliveryFee: {
        type: Number,
        default: 0
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
    },
    type: {
        type: String,
        require: true
    },
    status: {
        type: String,
        default: "preparing"
    }
})

orderSchema.statics.placeOrder = async function ({ uuid, name, lastname, items, amount, phone, address, type, deliveryFee }) {
    
    if ( !uuid || !name || !lastname || !items || !amount || !phone || !address || !type) {
        throw new Error('All fields must be filled')
    }

    const newOrder = await this.create({ uuid, name, lastname, items, amount, phone, address, type, deliveryFee })

    return newOrder

}

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema)
