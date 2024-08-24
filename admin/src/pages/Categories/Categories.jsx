import React, { useState, useEffect } from 'react'
import { useCategoriesContext } from '../../hooks/useCategoriesContext'

import { Sidebar } from './components/Sidebar'
import { Items } from './components/Items'

export const Categories = () => {

    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const { dispatch } = useCategoriesContext()

    useEffect(() => {

        const fetchCategories = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/category/`)

                if (!response.ok) {
                    setError('Failed to fetch products')
                }

                const json = await response.json()
                dispatch({ type: 'SET_CATEGORIES', payload: json })
                setError('')

            } catch (error) {
                setError(error.message)
                console.error(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()

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
