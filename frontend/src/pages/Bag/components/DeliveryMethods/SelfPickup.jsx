import React, { useEffect, useState } from 'react'

import './DeliveryMethod.scss'

export const SelfPickup = ({ totalPrice, deliveryFee = 0 }) => {
    return (
        <form className="bag__checkout-form">
            <div className="bag__checkout-form__row">
                <input required type='text' className="input" placeholder='Name*' />
                <input required type='text' className="input" placeholder='Last name*' />
            </div>
            <input required type='phone' className="input" placeholder='Phone number*' />
            <div className="bag__checkout-form__helper">* - must be filled</div>
            <div className="bag__checkout-form__price">
                <p className="bag__checkout-form__price-subtotal">
                    subtotal: {totalPrice ? `${totalPrice}$` : '--'}
                </p>
                <p className="bag__checkout-form__price-total">total: {totalPrice ? `${totalPrice + deliveryFee}$` : '--'}</p>
            </div>
            <div className="bag__checkout-form__btns">
                <button className="btn btn__black bag__checkout-form__btn">Order</button>
            </div>
        </form>
    )
}
