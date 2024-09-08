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
    const [notification, setNotification] = useState(null)

    const closeNotification = () => {
        setNotification(null)
    }

    const fetchBag = async () => {
        setLoading(true)
        setError(null)
        setNotification(null)

        if (user === 'guest') {
            const bag = localStorage.getItem('golden-crust-bag')
            
            if (!bag) {
                localStorage.setItem('golden-crust-bag', JSON.stringify({}))
            }

            dispatch({ type: "SET_BAG", payload: JSON.parse(bag) || {} })

            setLoading(false)

            return
        }

        try {
            const lsBag = JSON.parse(localStorage.getItem('golden-crust-bag'))

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bag/get`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                method: 'POST',
                body: JSON.stringify({ items: lsBag })
            })

            if (!response.ok) {
                throw new Error('Failed to fetch bag')
            }

            const json = await response.json()

            if (json.merged) {
                localStorage.removeItem('golden-crust-bag')
                setNotification('Your bags have been combined.')
            }

            dispatch({ type: "SET_BAG", payload: json.data })
            
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
        <BagContext.Provider value={{ ...state, dispatch, loading, error, notification, closeNotification }}>
            {children}
        </BagContext.Provider>
    )
}