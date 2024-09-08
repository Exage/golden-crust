import React from 'react'
import { ReactSVG } from 'react-svg'

import { useBagContext } from '../../../../hooks/useBagContext'
import { useProductsContext } from '../../../../hooks/useProductsContext'
import { useRemoveAllBagItems } from '../../../../hooks/useRemoveAllBagItems'

import './Products.scss'
import { Loader } from '../../../../components/Loader/Loader'
import close from '../../../../assets/icons/xmark.svg'
import alert from '../../../../assets/icons/alert.svg'

import { Product } from '../Product/Product'

export const Products = ({ bagItems }) => {

    const { loading: bagLoading, notification, closeNotification } = useBagContext()
    const { loading: productsLoading } = useProductsContext()
    const { removeAllBagItem, isLoading } = useRemoveAllBagItems()

    const handelRemoveAllBagItem = async () => {
        await removeAllBagItem()
    }

    if (bagLoading || productsLoading) {
        return (
            <div className="bag__products loading">
                <Loader />
            </div>
        )
    }

    return (
        <div className="bag__products">

            {notification && (
                <div className="bag__notification">
                    <button className="bag__notification-close" onClick={closeNotification}>
                        <ReactSVG src={close} className='bag__notification-close__icon' />
                    </button>
                    <div className="bag__notification-header">
                        <ReactSVG src={alert} className="bag__notification-header__icon" />
                        Warning
                    </div>
                    <div className="bag__notification-body">
                        {notification}
                    </div>
                </div>
            )}

            <div className="bag__products-title">Products</div>

            <div className={`bag__products-items${isLoading ? ' bag__products-items__disabled' : ''}`}>
                {bagItems && bagItems.map(item => <Product key={item._id} data={item} />)}
            </div>
            <div className="bag__products-btns">
                <button
                    className="btn bag__products-btn"
                    onClick={handelRemoveAllBagItem}
                    disabled={isLoading}
                >
                    {isLoading ? <Loader size={16} /> : 'Clear All'}
                </button>
            </div>

        </div>
    )
}
