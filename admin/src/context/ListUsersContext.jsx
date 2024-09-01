import { createContext, useReducer, useEffect, useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'

export const ListUsersContext = createContext()

export const listUsersReducer = (state, action) => {
    switch (action.type) {
        case "SET_USERS":
            return {
                users: action.payload
            }
        case 'UPDATE_USER':
            return {
                users: state.users.map((item) =>
                    item._id === action.payload._id ? { ...item, ...action.payload } : item
                )
            }
        case 'DELETE_USER':
            return {
                users: state.users.filter((item) => item._id !== action.payload._id)
            }
    }
}

export const ListUsersContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(listUsersReducer, {
        users: null
    })

    const { user } = useAuthContext()

    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)

    const fetchUsers = async () => {
        
        setLoading(true)
        setError('')

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/admin/list`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            if (!response.ok) {
                throw new Error('Failed to fetch users')
            }

            const json = await response.json()

            dispatch({ type: 'SET_USERS', payload: json.data })
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
            fetchUsers()
        }
    }, [user])

    return (
        <ListUsersContext.Provider value={{ ...state, loading, error, dispatch }}>
            {children}
        </ListUsersContext.Provider>
    )
}