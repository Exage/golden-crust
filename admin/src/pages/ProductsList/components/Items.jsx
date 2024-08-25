import React, { useEffect, useState } from 'react'
import { useProductsContext } from '../../../hooks/useProductsContext'
import { Item } from './Item'

import './Items.scss'

export const Items = () => {

    const { products } = useProductsContext()
    const [displayProducts, setDisplayProducts] = useState(null)

    useEffect(() => {
        setDisplayProducts(products)
    }, [products])

    return (
        <div className="page__items">
            {displayProducts && displayProducts.map(item => <Item key={item._id} data={item}/>)}
        </div>
    )
}
