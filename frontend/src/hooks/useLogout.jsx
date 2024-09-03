import { useAuthContext } from './useAuthContext'
import { useBagContext } from './useBagContext'

export const useLogout = () => {

    const { dispatch: authDispatch } = useAuthContext()
    const { dispatch: bagContext } = useBagContext()

    const logout = () => {
        localStorage.removeItem('golden-crust-user')

        authDispatch({ type: 'LOGOUT' })
        bagContext({ type: 'SET_BAG', payload: {} })
    }

    return { logout }

}