import React from 'react'
import { useProductsContext } from '../../../hooks/useProductsContext'

import { Loader } from '../../../components/Loader/Loader'

import './Products.scss'

import { Product } from '../../../components/Product/Product'

export const Products = ({ category, products }) => {

    const { loading } = useProductsContext()

    if (loading) {
        return (
            <div className="category__products-loader__wrapper">
                <div className="category__products-loader">
                    <Loader />
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="category__products">
                <div className="category__products-body">
                    {products && products.map(data => (
                        <Product
                            key={data._id}
                            data={data}
                            primaryColor={category && category.primaryColor}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
