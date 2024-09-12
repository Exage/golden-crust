import React, { useReducer, createContext, useEffect, useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'

export const AddressesContext = createContext()

export const addressesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ADDRESSES':
            return {
                addresses: action.payload
            }
        case 'ADD_ADDRESSES':
            return {
                addresses: [...state.addresses, action.payload]
            }
        case 'DELETE_ADDRESS':
            return {
                addresses: state.addresses.filter((item) => item._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const AddressesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(addressesReducer, {
        addresses: null
    })

    const { user } = useAuthContext()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchAddresses = async () => {
        setLoading(true)
        setError(null)

        if (user === 'guest') {
            return
        }

        try {

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/address/get`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                method: 'GET',
            })

            if (!response.ok) {
                throw new Error('Failed to fetch addresses')
            }

            const json = await response.json()

            dispatch({ type: "SET_ADDRESSES", payload: json.data })

            setError(null)

        } catch (error) {
            setError(error.message)
            console.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user) {
            fetchAddresses()
        }
    }, [user])

    return (
        <AddressesContext.Provider value={{ ...state, dispatch, loading, error }}>
            {children}
        </AddressesContext.Provider>
    )
}