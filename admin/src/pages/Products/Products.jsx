import React, { useEffect } from 'react'
import { useFetchCategories } from '../../hooks/useFetchCategories'
import { useFetchProducts } from '../../hooks/useFetchProducts'
import { useCategoriesContext } from '../../hooks/useCategoriesContext'
import { useProductsContext } from '../../hooks/useProductsContext'

import { Outlet } from 'react-router-dom'

export const Products = () => {

    const { categories } = useCategoriesContext()
    const { products } = useProductsContext()

    const { getCategories } = useFetchCategories()
    const { getProducts } = useFetchProducts()

    useEffect(() => {
        
        const getData = async () => {
            if (!categories) {
                await getCategories()
            }

            if (!products) {
                await getProducts()
            }
        }

        getData()

    }, [])

    return (
        <Outlet />
    )
}
