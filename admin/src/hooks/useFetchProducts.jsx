import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useProductsContext } from './useProductsContext'

export const useFetchProducts = () => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const { dispatch } = useProductsContext()
    const { user } = useAuthContext()

    const getProducts = async () => {
        setIsLoading(true)
        setError(null)
        setSuccess(null)

        if (!user) {
            setError('You must be logged in!')
            return
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/list`, {
            method: 'GET',
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'SET_PRODUCTS', payload: json.data.reverse() })
            setIsLoading(false)

            setSuccess(json.message)

            return json
        }

        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
        }
    }

    return { isLoading, getProducts, error, success }
}
