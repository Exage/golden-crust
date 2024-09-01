import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useCategoriesContext } from './useCategoriesContext'

export const useDeleteCategory = () => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const { dispatch } = useCategoriesContext()
    const { user } = useAuthContext()

    const deleteCategory = async (id) => {
        setIsLoading(true)
        setError(null)
        setSuccess(null)

        if (!user) {
            setError('You must be logged in!')
            return
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/category/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_CATEGORY', payload: json })
            
            setIsLoading(false)
            setSuccess(json.message)

            return json
        }

        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
        }
    }

    return { isLoading, deleteCategory, error, success }
}
