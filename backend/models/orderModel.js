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
    
    if ( !uuid || !name || !lastname || !items || !amount || !phone || !address.street || !address.house || !address.flat || !type) {
        throw new Error('All fields must be filled')
    }

    const maxLength = 30

    if (name.length > maxLength) {
        throw Error(`Name cannot be longer than ${maxLength} characters`)
    }

    if (lastname.length > maxLength) {
        throw Error(`Last Name cannot be longer than ${maxLength} characters`)
    }

    const phoneRegex = /^\+375\d{9}$/

    if (!phoneRegex.test(phone)) {
        throw Error('Invalid phone number format!')
    }

    console.log(address)

    if (address.street.length > maxLength) {
        throw Error(`Street cannot be longer than ${maxLength} characters`)
    }

    if (address.house.length > maxLength) {
        throw Error(`House cannot be longer than ${maxLength} characters`)
    }

    if (address.flat.length > maxLength) {
        throw Error(`Flat cannot be longer than ${maxLength} characters`)
    }

    const newOrder = await this.create({ uuid, name, lastname, items, amount, phone, address, type, deliveryFee })

    return newOrder

}

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema)
