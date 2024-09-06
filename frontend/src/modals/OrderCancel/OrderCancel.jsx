import React, { useEffect, useState } from 'react'
import { ReactSVG } from 'react-svg'
import { useCancelOrder } from '../../hooks/useCancelOrder'

import { Loader } from '../../components/Loader/Loader'

import './OrderCancel.scss'

import xmark from '../../assets/icons/xmark.svg'

export const OrderCancel = ({ showConfirmation, setShowConfirmation, orderData }) => {

    const { cancelOrder, isLoading } = useCancelOrder()
    const [showMore, setShowMore] = useState(false)

    const closeWindow = (Event) => {
        Event.preventDefault()
        setShowConfirmation(false)
    }

    const stopPropagation = (Event) => {
        Event.stopPropagation()
    }

    useEffect(() => {
        if (showConfirmation) {
            document.body.classList.add('noscroll')
        } else {
            document.body.classList.remove('noscroll')
        }
    }, [showConfirmation])

    const handleCancelOrder = async () => {
        await cancelOrder(orderData._id)
        setShowConfirmation(false)
    }

    return (
        <div className={`modal__overlay${showConfirmation ? ' open' : ''}`} onClick={closeWindow}>
            <div className="modal__overflow">
                <div className="container">
                    <div className="modal__content" onClick={stopPropagation}>

                        <button className="modal__close" onClick={closeWindow}>
                            <ReactSVG src={xmark} />
                        </button>

                        <h1 className='order__cancel-title'>Cancel your order?</h1>

                        {orderData && (
                            <>
                                <div className="order__cancel-products">

                                    {orderData.items.slice(0, 3).map(item => (
                                        <div className="order__cancel-product" key={item._id}>
                                            <div className="order__cancel-product__name">
                                                {item.name} {item.quantity > 1 ? ` x${item.quantity}` : ''}
                                            </div>
                                            <div className="order__cancel-product__name">
                                                {item.price * item.quantity}$
                                            </div>
                                        </div>
                                    ))}
                                    {showMore && orderData.items.slice(3).map(item => (
                                        <div className="order__cancel-product" key={item._id}>
                                            <div className="order__cancel-product__name">
                                                {item.name} {item.quantity > 1 ? ` x${item.quantity}` : ''}
                                            </div>
                                            <div className="order__cancel-product__name">
                                                {item.price * item.quantity}$
                                            </div>
                                        </div>
                                    ))}

                                    {orderData.items.length > 3 && (
                                        <button onClick={() => setShowMore(!showMore)}>
                                            show
                                            {showMore ? ' less' : ' more'}
                                        </button>
                                    )}

                                    <div className="order__cancel-products__amount">
                                        <div>
                                            {orderData.deliveryFee ? `delivery fee: ${orderData.deliveryFee}$` : ''}
                                        </div>
                                        <div>
                                            total: {orderData.amount + orderData.deliveryFee}$
                                        </div>
                                    </div>

                                </div>
                            </>
                        )}

                        <div className="order__cancel-btns">
                            <button className="btn btn__red order__cancel-btn" onClick={handleCancelOrder} disabled={isLoading}>
                                {isLoading ? <Loader size={16} /> : 'yes, cancel my order'}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
