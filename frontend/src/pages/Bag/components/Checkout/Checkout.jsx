import React, { useState, useEffect } from 'react'

import { useAuthContext } from '../../../../hooks/useAuthContext'

import './Checkout.scss'

import { Radio } from '../../../../components/Radio/Radio'

import { SelfPickup } from '../DeliveryMethods/SelfPickup'
import { Delivery } from '../DeliveryMethods/Delivery'

export const Checkout = ({ bagItems }) => {

    const deliveryMethodName = 'delivery-method'

    const { user } = useAuthContext()

    const [deliveryMethod, setDeliveryMethod] = useState('self-pickup')
    const [totalPrice, setTotalPrice] = useState(null)

    const calcTotalPrice = () => {
        const totalPrice = bagItems && bagItems.reduce((accumulator, currentValue) => {
            return accumulator + (currentValue.price * currentValue.quantity)
        }, 0)

        return totalPrice
    }

    useEffect(() => {
        setTotalPrice(calcTotalPrice())
    }, [bagItems])

    return (
        <div className="bag__checkout">
            <div className="bag__checkout-sticky">

                <h1 className="bag__checkout-title">
                    Delivery method
                </h1>

                <div className="bag__checkout-delivery">
                    <Radio
                        name={deliveryMethodName}
                        index="delivery-method-0"

                        defaultValue={'self-pickup'}
                        value={deliveryMethod}
                        onChange={Event => setDeliveryMethod(Event.target.value)}
                    >
                        self-pickup
                    </Radio>
                    <Radio
                        name={deliveryMethodName}
                        index="delivery-method-1"

                        defaultValue='delivery'
                        value={deliveryMethod}
                        onChange={Event => setDeliveryMethod(Event.target.value)}
                    >
                        delivery
                    </Radio>
                </div>

                <h1 className="bag__checkout-title">
                    Delivery information
                </h1>

                <div className="bag__checkout-forms">
                    {deliveryMethod === 'self-pickup' && <SelfPickup totalPrice={totalPrice} bagItems={bagItems} />}
                    {deliveryMethod === 'delivery' && <Delivery totalPrice={totalPrice} bagItems={bagItems} deliveryFee={8} />}
                </div>
            </div>
        </div>
    )
}
