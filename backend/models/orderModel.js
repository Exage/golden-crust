const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    userId: {
        type: String,
        default: "none"
    },
    items: {
        type: Array,
        required: true
    },
    amoun: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: "On the way"
    },
    type: {
        type: String,
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

orderSchema.statics.placeOrder = async function ({  })  {
    
}

module.exports = mongoose.models.OrderSchema || mongoose.model('Order', orderSchema)