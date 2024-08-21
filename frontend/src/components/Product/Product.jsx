import React from 'react'

import './Product.scss'

export const Product = ({ data, primaryColor, secondaryColor }) => {

    const { name, photo, description, price } = data

    return (
        <div className="product">
            <div className="product__photo">
                <img src={photo} alt={name} />
            </div>
            <div className="product__title-wrapper">
                <h1 className="product__title">{name}</h1>
            </div>
            <div className="product__description-wrapper">
                <p className="product__description">{description}</p>
            </div>
            <div className="product__price-wrapper">
                <div className="product__price">
                    <div className="product__price-amount">{price}</div>
                    <div className="product__price-currency">$</div>
                </div>
            </div>
            <div className="product__btn-wrapper">
                <button className="btn btn__custombg product__btn" style={{ borderColor: primaryColor, color: primaryColor, backgroundColor: primaryColor }}>
                    <div className="product__btn-bg"></div>
                    Add to Bag
                </button>
            </div>
        </div>
    )
}
