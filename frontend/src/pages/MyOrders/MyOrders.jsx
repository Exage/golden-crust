import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useOrdersContext } from '../../hooks/useOrdersContext'

import './MyOrders.scss'

import { Title } from '../../components/Title/Title'
import { Order } from './components/Order/Order'
import { Loader } from '../../components/Loader/Loader'

import { OrderCancel } from '../../modals/OrderCancel/OrderCancel'

import noProductsIcon from '../../assets/bag/cookies.svg'

export const MyOrders = () => {

    const { orders, loading } = useOrdersContext()

    const [orderData, setOrderData] = useState()
    const [showConfirmation, setShowConfirmation] = useState(false)

    if (loading) {
        return (
            <div className="page__padding">
                <div className="page myorders myorders__empty">
                    <div className="container">

                        <div className="myorders__loader">
                            <Loader />
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    if ((orders && orders.length) === 0) {
        return (
            <div className="page__padding">
                <div className="page myorders myorders__empty">
                    <div className="container">

                        <div className="myorders__noitems">
                            <div className='myorders__noitems-photo'>
                                <img src={noProductsIcon} alt="" />
                            </div>
                            <h1 className='myorders__noitems-title'>No orders</h1>
                            <p className='myorders__noitems-text'>
                                You currently have no active orders. Once you place an order, it will appear here. Check out our <Link to='/' className='link'>menu </Link> to choose something delicious!
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

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
