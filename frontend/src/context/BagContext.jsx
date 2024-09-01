import React, { useReducer, createContext, useEffect, useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'

export const BagContext = createContext()

export const bagReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BAG':
            return {
                bag: action.payload
            }
        default:
            return state
    }
}

export const BagContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(bagReducer, {
        bag: JSON.parse(localStorage.getItem('golden-crust-bag')) || []
    })

    const { user } = useAuthContext()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchBag = async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bag/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })

            if (!response.ok) {
                throw new Error('Failed to fetch categories')
            }

            const json = await response.json()

            dispatch({ type: "SET_BAG", payload: json.data })
            localStorage.removeItem('golden-crust-bag')
            
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
            fetchBag()
        }
    }, [user])

    return (
        <BagContext.Provider value={{ ...state, dispatch, loading, error }}>
            {children}
        </BagContext.Provider>
    )
}