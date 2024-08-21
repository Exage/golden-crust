import React, { useContext } from 'react'
import { StoreContext } from '../../../context/StoreContext'

import './Products.scss'

import { Product } from '../../../components/Product/Product'

export const Products = ({ primaryColor, products }) => {
    return (
        <div className="container">
            <div className="category__products">
                <div className="category__products-body">
                    {products.map(data => <Product key={data._id} data={data} primaryColor={primaryColor} />)}
                </div>
            </div>
        </div>
    )
}
