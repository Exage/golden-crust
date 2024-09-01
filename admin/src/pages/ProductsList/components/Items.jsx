import React, { useEffect, useState } from 'react'
import { useCategoriesContext } from '../../../hooks/useCategoriesContext'
import { useProductsContext } from '../../../hooks/useProductsContext'
import { Item } from './Item'

import './Items.scss'

export const Items = () => {

    const { categories } = useCategoriesContext()
    const { products, loading, error } = useProductsContext()

    const [category, setCategory] = useState('all')
    const [displayProducts, setDisplayProducts] = useState(null)

    useEffect(() => {
        if (products) {

            if (category === 'all') {
                setDisplayProducts(products)
            } else {
                const filteredProducts = products.filter(item => item.category === category)
                setDisplayProducts(filteredProducts)
            }

        }
    }, [products, category])

    return (
        <div className="page__items">
            <div className="page__items-filter">
                category:
                &nbsp;
                <select value={category} onChange={Event => setCategory(Event.target.value)} disabled={!products}>
                    <option value="all">All</option>

                    {categories && categories.map(item => <option key={item._id} value={item.name}>{item.name}</option>)}

                </select>
            </div>
            {displayProducts && displayProducts.map(item => <Item key={item._id} data={item} />)}
        </div>
    )
}
