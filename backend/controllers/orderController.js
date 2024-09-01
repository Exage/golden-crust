const OrderModel = require('../models/orderModel')
const UserModel = require('../models/userModel')
const Stripe = require('stripe')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const placeOrder = async (req, res) => {
    
}

module.exports = { placeOrder }