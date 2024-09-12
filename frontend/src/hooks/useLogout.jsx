import { useAuthContext } from './useAuthContext'
import { useBagContext } from './useBagContext'
import { useAddressesContext } from './useAddressesContext'

export const useLogout = () => {

    const { dispatch: authDispatch } = useAuthContext()
    const { dispatch: bagContext } = useBagContext()
    const { dispatch: addressesContext } = useAddressesContext()

    const logout = () => {
        authDispatch({ type: 'LOGOUT' })
        localStorage.setItem('golden-crust-user', JSON.stringify('guest'))
        bagContext({ type: 'SET_BAG', payload: {} })
        addressesContext({ type: 'SET_ADDRESSES', payload: null })
    }

    return { logout }

}