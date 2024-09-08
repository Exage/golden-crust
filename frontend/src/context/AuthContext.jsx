import React, { useReducer, createContext, useEffect, useState } from "react"
import { jwtDecode } from 'jwt-decode'
import { v4 as uuidv4 } from 'uuid'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                user: action.payload
            }
        case 'LOGOUT':
            return {
                user: 'guest'
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
        const token = JSON.parse(localStorage.getItem('golden-crust-user'))

        if (token && token !== 'guest') {
            const user = jwtDecode(token)
            const currentDate = Date.now() / 1000
            
            if (user.exp > currentDate) {
                dispatch({ type: 'LOGIN', payload: {...user, token} })
            } else {
                dispatch({ type: 'LOGOUT' })
            }
        } else {
            localStorage.setItem('golden-crust-user', JSON.stringify('guest'))

            const ordersUuid = JSON.parse(localStorage.getItem('golden-crust-orders-uuid'))

            if (!ordersUuid) {
                localStorage.setItem('golden-crust-orders-uuid', JSON.stringify(uuidv4()))
            }
            
            dispatch({ type: 'LOGIN', payload: 'guest' })
        }

        setLoading(false)
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch, loading }}>
            {children}
        </AuthContext.Provider>
    )
}