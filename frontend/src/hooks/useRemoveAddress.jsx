import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useAddressesContext } from './useAddressesContext'

export const useRemoveAddress = () => {

    const { user } = useAuthContext()
    const { dispatch } = useAddressesContext()

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const removeAddress = async (id) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/address/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
        }

        if (response.ok) {
            dispatch({ type: "DELETE_ADDRESS", payload: json.data })
            setIsLoading(false)
            
            return json
        }
    }

    return { isLoading, removeAddress, error }

}