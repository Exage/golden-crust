import React, { useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

import './Category.scss'

import { Header } from './Components/Header'
import { Products } from './Components/Products'

export const Category = () => {

    const { category: currentCategory } = useParams()
    const { categories, products } = useContext(StoreContext)

    const { primaryColor, title, name } = categories.find(item => item.name === currentCategory)
    const currentProducts = products.filter(product => product.category === name)

    return (
        <div className="category">
            <Header primaryColor={primaryColor} title={title} name={name} />
            <Products primaryColor={primaryColor} products={currentProducts} />
        </div>
    )
}
