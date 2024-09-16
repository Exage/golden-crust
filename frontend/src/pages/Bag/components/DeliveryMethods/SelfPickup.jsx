import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePlaceOrder } from '../../../../hooks/usePlaceOrder'
import { useAuthContext } from '../../../../hooks/useAuthContext'
import { ReactSVG } from 'react-svg'

import location from '../../../../assets/icons/location.svg'
import arrowDown from '../../../../assets/icons/arrow-down.svg'

import './DeliveryMethod.scss'
import { Loader } from '../../../../components/Loader/Loader'

import { addresses } from '../../../../config/addresses'

export const SelfPickup = ({ totalPrice, bagItems, deliveryFee = 0 }) => {

    const { user, error } = useAuthContext()
    const { placeOrder, isLoading } = usePlaceOrder()

    const [name, setName] = useState(user !== 'guest' ? user.name : '')
    const [lastname, setLastname] = useState(user !== 'guest' ? user.lastName : '')
    const [phone, setPhone] = useState(user !== 'guest' ? user.phone : '')
    const [shop, setShop] = useState(addresses[0])

    const [disableBtn, setDisableBtn] = useState(false)

    const placeOrderHandle = async (Event) => {
        Event.preventDefault()

        setDisableBtn(true)

        const response = await placeOrder({
            uuid: user === 'guest' ? JSON.parse(localStorage.getItem('golden-crust-orders-uuid')) : user.ordersId,
            name: name.trim(),
            lastname: lastname.trim(),
            items: bagItems,
            amount: totalPrice,
            phone: phone.replace(/\s/g, ""),
            address: { street: shop.street, house: shop.house, flat: shop.flat },
            deliveryFee: deliveryFee,
            type: 'selfpickup',
        })

        if (response.success) {
            const { session_url } = response.data
            window.location.replace(session_url)
        }

    }

    return (
        <>
            {!user.phone && (
                <div className="bag__checkout-addresses__wrapper">
                    <p className="bag__checkout-addresses__noitems">
                        If you don't want to enter your phone number, go here and fill them out <Link className='link' to='/account'>there</Link>.
                    </p>
                </div>
            )}
            <form className="bag__checkout-form" onSubmit={placeOrderHandle}>
                <div className="bag__checkout-form__row">
                    <input
                        required
                        type='text'
                        className="input"
                        placeholder='Name*'

                        value={name}
                        onChange={Event => setName(Event.target.value)}
                    />
                    <input
                        required
                        type='text'
                        className="input"
                        placeholder='Last name*'

                        value={lastname}
                        onChange={Event => setLastname(Event.target.value)}
                    />
                </div>
                <input
                    required
                    type='phone'
                    className="input"
                    placeholder='Phone number*'

                    value={phone}
                    onChange={Event => setPhone(Event.target.value)}
                />
                <div className="select__address-wrapper">
                    <ReactSVG src={location} className='select__address-icon select__address-icon__location' />
                    <select
                        className='input select__address'
                        value={shop.id}
                        onChange={Event => setShop(addresses.find(item => item.id === parseInt(Event.target.value)))}
                    >
                        {addresses.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                    <ReactSVG src={arrowDown} className='select__address-icon select__address-icon__arrow' />
                </div>
                <div className="bag__checkout-form__helper">* - must be filled</div>
                <div className="bag__checkout-form__price">
                    <p className="bag__checkout-form__price-subtotal">
                        subtotal: {totalPrice ? `${totalPrice}$` : '--'}
                    </p>
                    <p className="bag__checkout-form__price-total">total: {totalPrice ? `${totalPrice + deliveryFee}$` : '--'}</p>
                </div>
                <div className="bag__checkout-form__btns">
                    <button className="btn btn__black bag__checkout-form__btn" disabled={disableBtn}>
                        {isLoading ? <Loader size={16} /> : 'Checkout'}
                    </button>
                </div>
                {error && (
                    <div className="bag__checkout-form__message">
                        <div className="error">{error}</div>
                    </div>
                )}
            </form>
        </>
    )
}
