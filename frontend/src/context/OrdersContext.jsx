import React, { useReducer, createContext, useEffect, useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'

export const OrdersContext = createContext()

export const ordersReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ORDERS':
            return {
                orders: action.payload
            }
        default:
            return state
    }
}

export const OrdersContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ordersReducer, {
        orders: null
    })

    const { user } = useAuthContext()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchOrders = async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/order/userorders/`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })

            if (!response.ok) {
                throw new Error('Failed to fetch orders')
            }

            const json = await response.json()

            dispatch({ type: "SET_ORDERS", payload: json.data.reverse() })

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
            fetchOrders()
        }
    }, [user])

    return (
        <OrdersContext.Provider value={{ ...state, dispatch, loading, error }}>
            {children}
        </OrdersContext.Provider>
    )
}