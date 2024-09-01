import { useAuthContext } from './useAuthContext'
import { useCategoriesContext } from './useCategoriesContext'
import { useProductsContext } from './useProductsContext'

export const useLogout = () => {

    const { dispatch: authDispatch } = useAuthContext()
    const { dispatch: productsDispatch } = useProductsContext()

    const logout = () => {
        localStorage.removeItem('golden-crust-admin')

        authDispatch({ type: 'LOGOUT' })
        productsDispatch({ type: 'SET_PRODUCTS', payload: null })
        useCategoriesContext({ type: 'SET_CATEGORIES', payload: null })
    }

    return { logout }

}