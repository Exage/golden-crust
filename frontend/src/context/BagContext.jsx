import React, { useReducer, createContext, useEffect, useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'
import { useProductsContext } from '../hooks/useProductsContext'

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
        bag: null
    })

    const { user } = useAuthContext()
    const { products } = useProductsContext()

    const [loading, setLoading] = useState(true)
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
        if (products) {
            if (user) {
                fetchBag()
            }
        }
    }, [user, products])

    return (
        <BagContext.Provider value={{ ...state, dispatch, loading, error }}>
            {children}
        </BagContext.Provider>
    )
}