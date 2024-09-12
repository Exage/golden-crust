import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { jwtDecode } from 'jwt-decode'

export const useSetName = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const { user, dispatch } = useAuthContext()

    const setName = async (name, lastname) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/setname`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ name, lastname })
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
        }

        if (response.ok) {
            localStorage.setItem('golden-crust-user', JSON.stringify(json.data))
            const user = jwtDecode(json.data)

            dispatch({ type: 'LOGIN', payload: {...user, token: json.data} })

            setIsLoading(false)

            return json
        }
    }

    return { isLoading, setName, error }
}