import React from 'react'

import { useBagContext } from '../../../../hooks/useBagContext'
import { useProductsContext } from '../../../../hooks/useProductsContext'
import { useRemoveAllBagItems } from '../../../../hooks/useRemoveAllBagItems'

import './Products.scss'
import { Loader } from '../../../../components/Loader/Loader'

import { Product } from '../Product/Product'

export const Products = ({ bagItems }) => {

    const { loading: bagLoading } = useBagContext()
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
