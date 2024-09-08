import { useAuthContext } from './useAuthContext'
import { useBagContext } from './useBagContext'

export const useLogout = () => {

    const { dispatch: authDispatch } = useAuthContext()
    const { dispatch: bagContext } = useBagContext()

    const logout = () => {
        authDispatch({ type: 'LOGOUT' })
        localStorage.setItem('golden-crust-user', JSON.stringify('guest'))
        bagContext({ type: 'SET_BAG', payload: {} })
    }

    return { logout }

}