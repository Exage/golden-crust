import React, { useReducer, createContext, useEffect, useState } from "react"
import { jwtDecode } from 'jwt-decode'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                user: action.payload
            }
        case 'LOGOUT':
            return {
                user: null
            }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('golden-crust-admin'))

        if (token) {
            const user = jwtDecode(token)
            const currentDate = Date.now() / 1000
            
            if (user.role === 'admin' && user.exp > currentDate) {
                const payload = {...user, token}
                dispatch({ type: 'LOGIN', payload })
            } else {
                dispatch({ type: 'LOGOUT' })
            }
        }

        setLoading(false)
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch, loading }}>
            {children}
        </AuthContext.Provider>
    )
}