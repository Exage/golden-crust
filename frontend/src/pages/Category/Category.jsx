import React from 'react'
import { useParams } from 'react-router-dom'

import { useCategoriesContext } from '../../hooks/useCategoriesContext'
import { useProductsContext } from '../../hooks/useProductsContext'

import './Category.scss'

import { Header } from './Components/Header'
import { Products } from './Components/Products'

export const Category = () => {

    const { categoryName } = useParams()
    
    const { categories } = useCategoriesContext()
    const { products: allProducts } = useProductsContext()

    const category = categories ? categories.find(item => item.name === categoryName) : null
    const products = allProducts ? allProducts.filter(item => item.category === categoryName) : null

    return (
        <div className="category">
            <Header category={category} />
            <Products category={category} products={products} />
        </div>
    )
}
