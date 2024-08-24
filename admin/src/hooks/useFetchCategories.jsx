import { useState } from 'react'
import { useCategoriesContext } from './useCategoriesContext'

export const useFetchCategories = () => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const { dispatch } = useCategoriesContext()
    // const { user } = useAuthContext()

    const getCategories = async () => {
        setIsLoading(true)
        setError(null)
        setSuccess(null)

        // if (!user) {
        //     setError('You must be logged in!')
        //     return
        // }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/category/`, {
            method: 'GET',
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'SET_CATEGORIES', payload: json })
            setIsLoading(false)
            setSuccess(json.message)

            return json
        }

        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
        }
    }

    return { isLoading, getCategories, error, success }
}
