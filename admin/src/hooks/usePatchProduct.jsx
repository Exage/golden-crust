import { useState } from 'react'
import { useProductsContext } from './useProductsContext'

export const usePatchProduct = () => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const { dispatch } = useProductsContext()
    // const { user } = useAuthContext()

    const patchProduct = async (data) => {
        setIsLoading(true)
        setError(null)
        setSuccess(null)

        // if (!user) {
        //     setError('You must be logged in!')
        //     return
        // }

        const { _id, image, name, description, price, category } = data

        const formData = new FormData()
        formData.append('image', image)
        formData.append('name', name)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('category', category)

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${_id}`, {
            method: 'PUT',
            body: formData,
            headers: {
                // 'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'UPDATE_PRODUCT', payload: json.data })
            setIsLoading(false)
            setSuccess(json.message)
            return json
        }

        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
        }
    }

    return { isLoading, patchProduct, error, success }
}
