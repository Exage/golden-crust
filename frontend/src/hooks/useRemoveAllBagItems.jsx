import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useBagContext } from './useBagContext'

export const useRemoveAllBagItems = () => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const { dispatch } = useBagContext()
    const { user } = useAuthContext()

    const removeAllBagItem = async () => {
        setIsLoading(true)
        setError(null)
        setSuccess(null)

        if (!user) {

            setIsLoading(false)
            setError(null)
            setSuccess(null)

            localStorage.setItem('golden-crust-bag', JSON.stringify({}))

            dispatch({ type: 'SET_BAG', payload: {} })

            return
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bag/removeAll`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'SET_BAG', payload: json.data })
            setIsLoading(false)
            setSuccess(json.message)
            return json
        }

        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
        }
    }

    return { isLoading, removeAllBagItem, error, success }
}
