import { createContext, useReducer, useEffect, useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'

export const ProductsContext = createContext()

export const productsReducer = (state, action) => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return {
                products: action.payload
            }
        case "ADD_PRODUCT":
            return {
                products: [action.payload, ...state.products]
            }
        case 'UPDATE_PRODUCT':
            return {
                products: state.products.map((item) =>
                    item._id === action.payload._id ? { ...item, ...action.payload } : item
                )
            }
        case 'DELETE_PRODUCT':
            return {
                products: state.products.filter((item) => item._id !== action.payload._id)
            }
    }
}

export const ProductsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productsReducer, {
        products: null
    })

    const { user } = useAuthContext()

    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)

    const fetchProducts = async () => {
        
        setLoading(true)
        setError('')

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/list`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            if (!response.ok) {
                throw new Error('Failed to fetch products')
            }

            const json = await response.json()

            dispatch({ type: 'SET_PRODUCTS', payload: json.data.reverse() })
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
            fetchProducts()
        }
    }, [user])

    return (
        <ProductsContext.Provider value={{ ...state, loading, error, dispatch }}>
            {children}
        </ProductsContext.Provider>
    )
}