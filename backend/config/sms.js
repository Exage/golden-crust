const sms = (type, data) => {
    if (type === 'success') {
        const { name, address } = data
        return `Hello, ${name}. Your order will be delivered to the address: st. ${address.street}, house ${address.house}${address.flat ? `, flat ${address.flat}` : ''}`
    }
}

module.exports = sms