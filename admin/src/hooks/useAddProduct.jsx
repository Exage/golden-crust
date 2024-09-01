import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useProductsContext } from './useProductsContext'

export const useAddProduct = () => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const { dispatch } = useProductsContext()
    const { user } = useAuthContext()

    const addProduct = async (image, name, description, price, category) => {
        setIsLoading(true)
        setError(null)
        setSuccess(null)

        if (!user) {
            setError('You must be logged in!')
            return
        }

        const formData = new FormData()
        formData.append('image', image)
        formData.append('name', name)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('category', category)

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/add`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'ADD_PRODUCT', payload: json.data })
            setIsLoading(false)
            setSuccess(json.message)
            return json
        }

        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
        }
    }

    return { isLoading, addProduct, error, success }
}
