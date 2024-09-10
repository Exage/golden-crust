const sms = (type, data) => {

    const { name, address, amount, deliveryFee } = data
    let message = ''

    switch (type) {
        case 'success_delivery':
            message = `Hello, ${name}. Your order will be delivered to the address: st. ${address.street}, house ${address.house}${address.flat ? `, flat ${address.flat}` : ''}. Total amount: ${amount + deliveryFee}$`
            break
        case 'success_selfpickup':
            message = `Hello, ${name}. Your order for ${amount}$ is being prepared`
            break
        case 'on the way':
            message = `Dear, ${name}. Your order will be delivered within 40 minutes.`
            break
        case 'ready to receive':
            message = `Dear, ${name}. Your order has been delivered, our courier will contact you soon.`
            break
        case 'ready for pickup':
            message = `Dear, ${name}. Your order is ready for delivery. You can pick it up at the address: st. ${address.street}, ${address.house}`
            break
        case 'cancel':
            message = `Your order is cancelled`
            break
        default:
            break
    }

    return message
}

module.exports = sms