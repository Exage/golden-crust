import React, { useState } from 'react'
import { useOrdersContext } from '../../hooks/useOrdersContext'

import './MyOrders.scss'

import { Title } from '../../components/Title/Title'
import { Order } from './components/Order/Order'

import { OrderCancel } from '../../modals/OrderCancel/OrderCancel'

export const MyOrders = () => {

    const { orders } = useOrdersContext()

    const [orderData, setOrderData] = useState()
    const [showConfirmation, setShowConfirmation] = useState(false)

    return (
        <div className="page__padding">
            <div className="page myorders">
                <div className="container">
                    <Title>My Orders</Title>

                    <div className="myorders__items">
                        {orders && orders.map(item => <Order key={item._id} data={item} setOrderData={setOrderData} setShowConfirmation={setShowConfirmation} />)}
                    </div>
                </div>

                <OrderCancel 
                    showConfirmation={showConfirmation} 
                    setShowConfirmation={setShowConfirmation}
                    orderData={orderData} 
                />

            </div>
        </div>
    )
}
