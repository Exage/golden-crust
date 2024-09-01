import React from 'react'
import { useProductsContext } from '../../hooks/useProductsContext'

import { Sidebar } from './components/Sidebar'
import { Items } from './components/Items'

export const ProductsList = () => {

    const { loading, error } = useProductsContext()

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
