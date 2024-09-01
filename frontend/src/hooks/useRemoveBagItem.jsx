import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useBagContext } from './useBagContext'

export const useRemoveBagItem = () => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const { dispatch } = useBagContext()
    const { user } = useAuthContext()

    const removeBagItem = async (id) => {
        setIsLoading(true)
        setError(null)
        setSuccess(null)

        if (!user) {

            setIsLoading(false)
            setError(null)
            setSuccess(null)

            const bag = JSON.parse(localStorage.getItem('golden-crust-bag')) || {}

            if (bag[id]) {
                delete bag[id]
            }

            localStorage.setItem('golden-crust-bag', JSON.stringify(bag))

            dispatch({ type: 'SET_BAG', payload: bag })

            return
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bag/${id}`, {
            method: 'DELETE',
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

    return { isLoading, removeBagItem, error, success }
}
