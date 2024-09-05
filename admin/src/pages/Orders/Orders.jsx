import React from 'react'
import { useOrdersContext } from '../../hooks/useOrdersContext'

export const Orders = () => {
    
    const { orders } = useOrdersContext()

    console.log(orders)
    
    return (
        <div className="orders">
            {orders && orders.map(item => item._id)}
        </div>
    )
}
