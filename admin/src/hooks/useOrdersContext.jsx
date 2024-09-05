import React from 'react'
import { useContext } from 'react'
import { OrdersContext } from '../context/OrdersContext'

export const useOrdersContext = () => {
    
    const context = useContext(OrdersContext)
    
    if (!context) {
        throw new Error('useOrdersContext must be used inside an OrdersContextProvider')
    }

    return context
}
