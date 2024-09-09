import React, { useState } from 'react'
import { useCancelOrder } from '../../../../hooks/useCancelOrder'

import './Order.scss'

import { ReactSVG } from 'react-svg'
import xmark from '../../../../assets/icons/xmark.svg'

const setStatus = (status) => {
    if (status === 'preparing') {
        return 'preparing'
    } else if (status === 'on the way') {
        return 'ontheway'
    } else if (status === 'ready to receive' || status === 'ready for pickup') {
        return 'ready'
    } else if (status === 'order received') {
        return 'received'
    } else if (status === 'canceled') {
        return 'canceled'
    }
}

export const Order = ({ data, setOrderData, setShowConfirmation }) => {

    const [showDetails, setShowDetails] = useState(false)

    const handleCancelBtn = () => {
        setShowConfirmation(true)
        setOrderData(data)
    }

    console.log(data)

    return (
        <div className="myorders__item">

            {data.status !== 'canceled' && (
                <div className="myorders__item-cancel__wrapper">
                    <button className="myorders__item-cancel__button" onClick={handleCancelBtn}>
                        <ReactSVG src={xmark} className='icon' />
                    </button>
                </div>
            )}

            <div className="myorders__item-header">
                <div className="myorders__item-header__info">
                    <h1 className="myorders__item-header__info-title">
                        {data.type === 'selfpickup' ? 'self-pickup' : data.type}
                    </h1>
                    <h2
                        className={`myorders__item-header__info-status ${setStatus(data.status)}`}
                    >
                        {data.status}
                    </h2>
                </div>
                <div className="myorders__item-header__address">
                    {data.type === 'delivery' && 'delivery address: '}
                    {data.type === 'selfpickup' && 'shop address: '}
        
                    st. {data.address.street}, {data.address.house}
                    {data.address.flat ? `, flat: ${data.address.flat}` : ''}
                </div>
                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="myorders__item-header__showdetails"
                >
                    show more
                </button>
            </div>
            {showDetails && (
                <div className="myorders__products">
                    {data.items.map(item => (
                        <div className="myorders__product" key={item._id}>
                            <div className="myorders__product-name">
                                {item.name} {item.quantity > 1 ? ` x${item.quantity}` : ''}
                            </div>
                            <div className="myorders__product-price">
                                {item.price * item.quantity}$
                            </div>
                        </div>
                    ))}
                    <div className="myorders__products-total">
                        <div className="myorders__product-price">
                            {data.deliveryFee ? `delivery fee: ${data.deliveryFee}$` : ''}
                        </div>
                        <div className="myorders__product-price">
                            total: {data.amount + data.deliveryFee}$
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
