import React, { useState } from 'react'
import { usePlaceOrder } from '../../../../hooks/usePlaceOrder'
import { useAuthContext } from '../../../../hooks/useAuthContext'

import './DeliveryMethod.scss'
import { Loader } from '../../../../components/Loader/Loader'

export const Delivery = ({ totalPrice, bagItems, deliveryFee = 0 }) => {

    const { user, error } = useAuthContext()
    const { placeOrder, isLoading } = usePlaceOrder()

    const [name, setName] = useState(user ? user.name : '')
    const [lastname, setLastname] = useState(user ? user.lastName : '')
    const [phone, setPhone] = useState(user ? user.phone : '')
    const [street, setStreet] = useState('')
    const [house, setHouse] = useState('')
    const [flat, setFlat] = useState('')

    const [disableBtn, setDisableBtn] = useState(false)

    const placeOrderHandle = async (Event) => {
        Event.preventDefault()

        setDisableBtn(true)

        const response = await placeOrder({
            userId: user ? user._id : 'none',
            name: name.trim(),
            lastname: lastname.trim(),
            items: bagItems,
            amount: totalPrice + deliveryFee,
            phone: phone.replace(/\s/g, ""),
            address: { street, house, flat },
            deliveryFee
        })

        if (response.success) {
            const { session_url } = response.data
            localStorage.setItem('golden-crust-bag', JSON.stringify({}))
            window.location.replace(session_url)
        }

    }

    return (
        <form onSubmit={placeOrderHandle} className="bag__checkout-form">
            <div className="bag__checkout-form__row">
                <input
                    type='text'
                    className="input"
                    placeholder='Name*'

                    value={name}
                    onChange={Event => setName(Event.target.value)}

                    required
                />
                <input
                    type='text'
                    className="input"
                    placeholder='Last name*'

                    value={lastname}
                    onChange={Event => setLastname(Event.target.value)}

                    required
                />
            </div>
            <input
                type='phone'
                className="input"
                placeholder='Phone number*'

                value={phone}
                onChange={Event => setPhone(Event.target.value)}

                required
            />
            <input
                type='text'
                className="input"
                placeholder='Street*'

                value={street}
                onChange={Event => setStreet(Event.target.value)}

                required
            />
            <input
                type='text'
                className="input"
                placeholder='House*'

                value={house}
                onChange={Event => setHouse(Event.target.value)}

                required
            />
            <input
                type='text'
                className="input"
                placeholder='Flat'

                value={flat}
                onChange={Event => setFlat(Event.target.value)}
            />
            <div className="bag__checkout-form__helper">* - must be filled</div>
            <div className="bag__checkout-form__price">
                <p className="bag__checkout-form__price-subtotal">
                    subtotal: {totalPrice ? `${totalPrice}$` : '--'}
                </p>
                <p className="bag__checkout-form__price-subtotal">
                    delivery fee: {deliveryFee ? `${deliveryFee}$` : '--'}
                </p>
                <p className="bag__checkout-form__price-total">total: {totalPrice ? `${totalPrice + deliveryFee}$` : '--'}</p>
            </div>
            <div className="bag__checkout-form__btns">
                <button className="btn btn__black bag__checkout-form__btn" disabled={disableBtn}>
                    {isLoading ? <Loader size={16} /> : 'Order'}
                </button>
            </div>
            {error && (
                <div className="bag__checkout-form__message">
                    <div className="error">{error}</div>
                </div>
            )}
        </form>
    )
}
