import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { jwtDecode } from 'jwt-decode'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
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

    return { isLoading, login, error }
}