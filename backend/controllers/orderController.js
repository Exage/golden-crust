const Order = require('../models/orderModel')
const User = require('../models/userModel')
const Stripe = require('stripe')
const twilio = require('twilio')
const sms = require('../config/sms')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const sendSmsNotification = async (phoneNumber, message) => {
    try {
        const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
        await client.messages.create({
            body: message,
            to: phoneNumber,
            from: process.env.TWILIO_PHONE_NUMBER
        })
    } catch (error) {
        console.error('Failed to send SMS:', error)
    }
}

const placeOrder = async (req, res) => {

    const { userId, name, lastname, items, amount, phone, address, deliveryFee } = req.body

    try {
        const order = await Order.placeOrder({ userId, name, lastname, items, amount, phone, address })

        if (userId !== 'none') {
            await User.findByIdAndUpdate(userId, { bagData: {} })
        }

        const line_items = items.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity
        }))

        if (deliveryFee) {
            line_items.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Delivery Charges'
                    },
                    unit_amount: deliveryFee * 100
                },
                quantity: 1
            })
        }

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${order._id}`,
            cancel_url: `${process.env.FRONTEND_URL}/verify?success=false&orderId=${order._id}`
        })

        res.status(200).json({ message: 'Order placed', success: true, data: { session_url: session.url } })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body

    try {
        if (success === 'true') {
            
            const order = await Order.findById(orderId) 
            
            if (!order.payment) {
                const newOrder = await Order.findByIdAndUpdate(orderId, { payment: true }, { new: true })

                res.status(200).json({ message: 'Paid successfuly', success: true, data: newOrder })
                sendSmsNotification(order.phone, sms('success', order))
            } else {
                res.status(200).json({ message: 'The order has already been paid', success: true, data: newOrder })
            }

        } else {
            await Order.findByIdAndDelete(orderId, { payment: false })
            res.status(200).json({ message: 'Paid failed', success: false })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id })
        res.status(200).json({ success: true, data: orders })
    } catch (error) {
        res.status(400).json({ success: false, message: error })
    }
} 

module.exports = { placeOrder, verifyOrder, getUserOrders }