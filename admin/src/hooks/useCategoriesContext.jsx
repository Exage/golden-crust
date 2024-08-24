import React from 'react'
import { useContext } from 'react'
import { CategoriesContext } from '../context/CategoriesContext'

export const useCategoriesContext = () => {
    
    const context = useContext(CategoriesContext)
    
    if (!context) {
        throw new Error('useCategoriesContext must be used inside an CategoriesContextProvider')
    }

    return context
}
