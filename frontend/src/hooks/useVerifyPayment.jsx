import { useState } from 'react'

export const useVerifyPayment = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const verifyPayment = async (orderId, success) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/order/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ orderId, success })
        })
        const json = await response.json()

        if (response.ok) {
            setIsLoading(false)
            return json
        }

        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
        }
    }

    return { isLoading, verifyPayment, error }
}