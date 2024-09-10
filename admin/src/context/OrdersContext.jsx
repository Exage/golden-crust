import { createContext, useReducer, useEffect, useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'

export const OrdersContext = createContext()

export const ordersReducer = (state, action) => {
    switch (action.type) {
        case "SET_ORDERS":
            return {
                orders: action.payload
            }
        case "ADD_ORDER":
            return {
                orders: [action.payload, ...state.orders]
            }
        case 'UPDATE_ORDER':
            return {
                orders: state.orders.map((item) =>
                    item._id === action.payload._id ? { ...item, ...action.payload } : item
                )
            }
        case 'DELETE_ORDER':
            return {
                orders: state.orders.filter((item) => item._id !== action.payload._id)
            }
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
        setError('')

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/order/list`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            if (!response.ok) {
                throw new Error('Failed to fetch orders')
            }

            const json = await response.json()

            dispatch({ type: 'SET_ORDERS', payload: json.data.reverse() })
            setError('')

        } catch (error) {
            setError(json.message)
            console.error(json.message)
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
        <OrdersContext.Provider value={{ ...state, loading, error, dispatch }}>
            {children}
        </OrdersContext.Provider>
    )
}