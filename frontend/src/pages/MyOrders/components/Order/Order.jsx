import React, { useState } from 'react'

import './Order.scss'

import { globalData } from '../../../../config/global'

const setStatus = (status) => {
    if (status === 'preparing for deliver') {
        return 'preparing'
    }
}

export const Order = ({ data }) => {

    const [showDetails, setShowDetails] = useState(false)

    return (
        <div className="myorders__item">
            <div className="myorders__item-header">
                <div className="myorders__item-header__info">
                    <h1 className="myorders__item-header__info-title">
                        {data.type}
                    </h1>
                    <h2
                        className={`myorders__item-header__info-status ${setStatus(data.status)}`}
                    >
                        {data.status}
                    </h2>
                </div>
                <div className="myorders__item-header__address">
                    st. {data.address.street},
                    house: {data.address.house}
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
                    <div className="myorders__product">
                        <div className="myorders__product-name">
                            delivery charges
                        </div>
                        <div className="myorders__product-price">
                            {data.deliveryFee}$
                        </div>
                    </div>
                    <div className="myorders__products-total">
                        <div className="myorders__product-price">
                            total: {data.amount + data.deliveryFee}$
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
