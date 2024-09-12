import React from 'react'

import './AddAddress.scss'

export const AddAddress = ({ setShowSetAddress }) => {

    const handleAddAddress = () => {
        setShowSetAddress(true)
    }

    return (
        <button className="account__addaddress" onClick={handleAddAddress}>
            <div className="account__addaddress-text">
                <div className="account__addaddress-text__plus">+</div>
            </div>
        </button>
    )
}
