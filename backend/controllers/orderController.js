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

    const { uuid, name, lastname, items, amount, phone, address, deliveryFee, type } = req.body
    const user = await User.findOne({ ordersId: uuid })

    if (user) {
        await User.findOneAndUpdate(user._id, { bagData: {} })
    }

    try {
        const order = await Order.placeOrder({ uuid, name, lastname, items, amount, phone, address, deliveryFee, type })

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

                const newOrder = await Order.findByIdAndUpdate(orderId, { payment: true, status: 'preparing' }, { new: true })

                res.status(200).json({ message: 'Paid successfuly', success: true, data: newOrder })

                sendSmsNotification(order.phone, sms(`success_${order.type}`, order))
            } else {
                res.status(200).json({ message: 'The order has already been paid', success: true, data: order })
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

    const { ordersId } = req.body

    try {
        const orders = await Order.find({ uuid: ordersId })
        res.status(200).json({ success: true, data: orders })
    } catch (error) {
        res.status(400).json({ success: false, message: error })
    }

}

const listAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
        res.status(200).json({ success: true, data: orders })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

const updateStatus = async (req, res) => {
    
    const { id } = req.params
    const { status } = req.body
    
    try {
        const order = await Order.findByIdAndUpdate(id, { status }, { new: true })

        res.status(200).json({ success: true, data: order, message: 'Status successfully updated!' })

        if (status === 'on the way') {
            sendSmsNotification(order.phone, sms('on the way', order))
        } else if (status === 'ready to receive') {
            sendSmsNotification(order.phone, sms('ready to receive', order))
        } else if (status === 'ready for pickup') {
            sendSmsNotification(order.phone, sms('ready for pickup', order))
        }

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

const cancelOrder = async (req, res) => {
    
    const { id } = req.params
    
    try {
        const order = await Order.findByIdAndUpdate(id, { status: 'canceled' }, { new: true })

        sendSmsNotification(order.phone, sms('cancel', order))
        res.status(200).json({ success: true, data: order, message: 'Status successfully updated!' })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

module.exports = { 
    placeOrder, 
    verifyOrder, 
    getUserOrders, 
    listAllOrders, 
    updateStatus, 
    cancelOrder
}