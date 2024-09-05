import React from 'react'
import { useOrdersContext } from '../../hooks/useOrdersContext'

import './MyOrders.scss'

import { Title } from '../../components/Title/Title'
import { Order } from './components/Order/Order'

export const MyOrders = () => {

    const { orders } = useOrdersContext()

    return (
        <div className="page__padding">
            <div className="page myorders">
                <div className="container">
                    <Title>My Orders</Title>

                    <div className="myorders__items">
                        {orders && orders.map(item => <Order key={item._id} data={item} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}
