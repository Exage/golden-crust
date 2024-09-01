import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useProductsContext } from './useProductsContext'

export const useDeleteProduct = () => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const { dispatch } = useProductsContext()
    const { user } = useAuthContext()

    const delteProduct = async (id) => {
        setIsLoading(true)
        setError(null)
        setSuccess(null)

        if (!user) {
            setError('You must be logged in!')
            return
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_PRODUCT', payload: json.data })
            
            setIsLoading(false)
            setSuccess(json.message)

            return json
        }

        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
        }
    }

    return { isLoading, delteProduct, error, success }
}
