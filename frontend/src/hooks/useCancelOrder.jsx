import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useOrdersContext } from './useOrdersContext'

export const useCancelOrder = () => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const { dispatch } = useOrdersContext()
    const { user } = useAuthContext()

    const cancelOrder = async (id) => {
        setIsLoading(true)
        setError(null)
        setSuccess(null)

        if (!user) {
            setError('You must be logged in!')
            return
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/order/cancel/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'UPDATE_ORDER', payload: json.data })
            setIsLoading(false)
            setSuccess(json.message)

            return json
        }

        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
        }
    }

    return { isLoading, cancelOrder, error, success }
}
