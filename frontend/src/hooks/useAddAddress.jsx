import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useAddressesContext } from './useAddressesContext'

export const useAddAddress = () => {

    const { user } = useAuthContext()
    const { dispatch } = useAddressesContext()

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const addAddress = async ({ street, house, flat }) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/address/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ 
                street: street.trim(), 
                flat: flat.trim(), 
                house: house.trim() 
            })
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
        }

        if (response.ok) {
            dispatch({ type: "ADD_ADDRESSES", payload: json.data })
            setIsLoading(false)
            
            return json
        }
    }

    return { isLoading, addAddress, error }

}