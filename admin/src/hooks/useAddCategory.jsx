import { useState } from 'react'
import { useCategoriesContext } from './useCategoriesContext'

export const useAddCategory = () => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const { dispatch } = useCategoriesContext()
    // const { user } = useAuthContext()

    const addCategory = async (name, title, description, primaryColor, secondaryColor) => {
        setIsLoading(true)
        setError(null)
        setSuccess(null)

        // if (!user) {
        //     setError('You must be logged in!')
        //     return
        // }
        
        const category = { name, title, description, primaryColor, secondaryColor }

        console.log(category)

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/category/`, {
            method: 'POST',
            body: JSON.stringify(category),
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'ADD_CATEGORY', payload: json.data })
            setIsLoading(false)
            setSuccess(json.message)

            return json
        }

        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
        }
    }

    return { isLoading, addCategory, error, success }
}
