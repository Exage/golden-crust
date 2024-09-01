import React from 'react'
import { useCategoriesContext } from '../../hooks/useCategoriesContext'

import { Sidebar } from './components/Sidebar'
import { Items } from './components/Items'

export const ProductsCategories = () => {

    const { loading, error } = useCategoriesContext()

    return (
        <div className="page products">
            <Sidebar />
            <div className="page__content">
                {error && <div className="error">{error}</div>}
                {loading ? <h1>Loading...</h1> : <Items />}
            </div>
        </div>
    )
}
