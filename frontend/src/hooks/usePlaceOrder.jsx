import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const usePlaceOrder = () => {
    const { user } = useAuthContext()

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const placeOrder = async (data) => {
        setIsLoading(true)
        setError(null)
        setSuccess(null)

        const { uuid, name, lastname, address, items, phone, amount, deliveryFee, type } = data

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/order/place`, {
            method: 'POST',
            body: JSON.stringify({ uuid, name, lastname, address, items, phone, amount, deliveryFee, type }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (response.ok) {
            setIsLoading(false)
            setSuccess(json.message)

            if (user === 'guest') {
                localStorage.setItem('golden-crust-bag', JSON.stringify({}))
            }
        }

        if (!response.ok) {
            setError(json.message)
            setIsLoading(false)
        }

        return json
    }

    return { isLoading, placeOrder, error, success }
}
