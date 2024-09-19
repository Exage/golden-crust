import React, { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useBagContext } from '../../hooks/useBagContext'
import { useAddBagItem } from '../../hooks/useAddBagItem'
import { useSubstractBagItem } from '../../hooks/useSubstractBagItem'

import { Loader } from '../Loader/Loader'

import './Product.scss'

export const Product = ({ data, primaryColor }) => {

    const { _id, name, image, description, price } = data

    const { user } = useAuthContext()
    const { bag, loading: bagLoading } = useBagContext()
    const { addBagItem, isLoading: addItemLoading } = useAddBagItem()
    const { substractBagItem, isLoading: substractItemLoading } = useSubstractBagItem()

    const bagItem = bag && bag[_id]
    const bagMultiplier = bagItem ? bagItem : 1

    const handleAddBagItemClick = async () => {
        if (user) {
            await addBagItem(_id)
        }
    }

    const handleSubstractBagItemClick = async () => {
        if (user) {
            await substractBagItem(_id)
        }
    }

    return (
        <div className="product">
            <div className="product__photo">
                <img 
                    src={`https://${import.meta.env.VITE_AWS_BUCKET_NAME}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/uploads/${data.image}`} 
                    alt={name} 
                />
            </div>
            <div className="product__title-wrapper">
                <h1 className="product__title">{name}</h1>
            </div>
            <div className="product__description-wrapper">
                <p className="product__description">{description}</p>
            </div>
            <div className="product__price-wrapper">
                <div className="product__price">
                    <div className="product__price-amount">{price * bagMultiplier}</div>
                    <div className="product__price-currency">$</div>
                </div>
            </div>
            {bagLoading && (
                <div className="product__btn-wrapper">
                    <Loader size={21} />
                </div>
            )}
            {!bagLoading && (
                <div className="product__btn-wrapper">
                    {!bagItem && (
                        <button
                            className="btn btn__custombg product__btn"
                            style={{
                                borderColor: primaryColor,
                                color: primaryColor,
                                backgroundColor: primaryColor
                            }}
                            onClick={handleAddBagItemClick}
                            disabled={addItemLoading}
                        >
                            <div className="product__btn-bg"></div>
                            Add to Bag
                        </button>
                    )}
                    {bagItem && (
                        <>
                            <button
                                className="btn btn__custombg product__btn product__btn-counter"
                                style={{
                                    borderColor: primaryColor,
                                    color: primaryColor,
                                    backgroundColor: primaryColor
                                }}
                                onClick={handleAddBagItemClick}
                                disabled={addItemLoading}
                            >
                                <div className="product__btn-bg"></div>
                                +
                            </button>
                            <span className="product__counter" style={{ color: primaryColor }}>{bagItem}</span>
                            <button
                                className="btn btn__custombg product__btn product__btn-counter"
                                style={{
                                    borderColor: primaryColor,
                                    color: primaryColor,
                                    backgroundColor: primaryColor
                                }}
                                onClick={handleSubstractBagItemClick}
                                disabled={substractItemLoading}
                            >
                                <div className="product__btn-bg"></div>
                                -
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}
