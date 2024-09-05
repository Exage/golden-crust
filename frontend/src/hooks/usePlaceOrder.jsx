import { useState } from 'react'

export const usePlaceOrder = () => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const placeOrder = async (data) => {
        setIsLoading(true)
        setError(null)
        setSuccess(null)

        const { userId, name, lastname, address, items, phone, amount, deliveryFee, type } = data
        let uid = 'none'

        if (userId) {
            uid = userId
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/order/place`, {
            method: 'POST',
            body: JSON.stringify({ userId, name, lastname, address, items, phone, amount, deliveryFee, type }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        setIsLoading(false)
        setSuccess(json.message)

        return json
    }

    return { isLoading, placeOrder, error, success }
}
