import React, { useState, useEffect } from 'react'

import { useProductsContext } from '../../hooks/useProductsContext'

import { Sidebar } from './components/Sidebar'
import { Items } from './components/Items'

export const Products = () => {

    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const { dispatch, products } = useProductsContext()

    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/list`)

                if (!response.ok) {
                    setError('Failed to fetch products')
                }

                const json = await response.json()
                dispatch({ type: 'SET_PRODUCTS', payload: json.data })
                setError('')

            } catch (error) {
                setError(error.message)
                console.error(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()

    }, [])

    return (
        <div className="page products">
            <Sidebar />
            <div className="page__content">
                {error && <div className="error">{error}</div>}
                {isLoading ? 'loading' : <Items />}
            </div>
        </div>
    )
}
