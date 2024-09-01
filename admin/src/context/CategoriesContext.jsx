import { createContext, useReducer, useState, useEffect } from "react"
import { useAuthContext } from '../hooks/useAuthContext'

export const CategoriesContext = createContext()

export const categoriesReducer = (state, action) => {
    switch (action.type) {
        case "SET_CATEGORIES":
            return {
                categories: action.payload
            }
        case "ADD_CATEGORY":
            return {
                categories: [action.payload, ...state.categories]
            }
        case 'UPDATE_CATEGORY':
            return {
                categories: state.categories.map((item) =>
                    item._id === action.payload._id ? { ...item, ...action.payload } : item
                )
            }
        case 'DELETE_CATEGORY':
            return {
                categories: state.categories.filter((item) => item._id !== action.payload._id)
            }
    }
}

export const CategoriesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(categoriesReducer, {
        categories: null
    })

    const { user } = useAuthContext()

    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)

    const fetchCategories = async () => {

        setLoading(true)
        setError('')

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/category`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            if (!response.ok) {
                throw new Error('Failed to fetch products')
            }

            const json = await response.json()

            dispatch({ type: 'SET_CATEGORIES', payload: json.reverse() })
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
            fetchCategories()
        }
    }, [user])

    return (
        <CategoriesContext.Provider value={{ ...state, loading, error, dispatch }}>
            {children}
        </CategoriesContext.Provider>
    )
}