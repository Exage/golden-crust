import { CategoriesContext } from '../context/CategoriesContext'
import { useContext } from 'react'

export const useCategoriesContext = () => {
    const context = useContext(CategoriesContext)

    if (!context) {
        throw Error('useCategoriesContext must be used inside an CategoriesContextProvider')
    }

    return context
}
