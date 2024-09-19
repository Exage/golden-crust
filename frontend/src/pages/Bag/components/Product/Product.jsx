import React from 'react'

import { useAddBagItem } from '../../../../hooks/useAddBagItem'
import { useSubstractBagItem } from '../../../../hooks/useSubstractBagItem'
import { useRemoveBagItem } from '../../../../hooks/useRemoveBagItem'

import './Product.scss'

export const Product = ({ data }) => {

    const { addBagItem, isLoading: addBagItemLoading } = useAddBagItem()
    const { substractBagItem, isLoading: substractBagItemLoading } = useSubstractBagItem()
    const { removeBagItem, isLoading: removaBagItemLoading } = useRemoveBagItem()

    const { _id, image, name, description, price, quantity } = data

    const handleAddBagItemClick = async () => {
        await addBagItem(_id)
    }

    const handleSubstractBagItemClick = async () => {
        await substractBagItem(_id)
    }

    const handleRemoveBagItemClick = async () => {
        await removeBagItem(_id)
    }

    return (
        <div className={`bag__product${removaBagItemLoading ? " bag__product-disabled" : ""}`}>
            <div className="bag__product-photo">
                <img src={`https://${import.meta.env.VITE_AWS_BUCKET_NAME}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/uploads/${data.image}`} alt={name} title={name} />
            </div>
            <div className="bag__product-info">

                <h1 className="bag__product-info__title">
                    {name}
                </h1>
                <p className="bag__product-info__description">
                    {description}
                </p>
                <div className="bag__product-info__price">
                    <div className="bag__product-info__price-amount">{price * quantity}</div>
                    <div className="bag__product-info__price-currency">$</div>
                </div>

                <div className="bag__product-counter">
                    <button
                        className="bag__product-counter__btn bag__product-counter__btn-add"
                        onClick={handleAddBagItemClick}
                        disabled={addBagItemLoading}
                    >
                        +
                    </button>
                    <div className="bag__product-counter__amount">
                        {quantity}
                    </div>
                    <button
                        className="bag__product-counter__btn bag__product-counter__btn-substract"
                        onClick={handleSubstractBagItemClick}
                        disabled={substractBagItemLoading}
                    >
                        -
                    </button>
                </div>

                <button
                    className="bag__product-remove"
                    onClick={handleRemoveBagItemClick}
                >
                    remove
                </button>

            </div>
        </div>
    )
}
