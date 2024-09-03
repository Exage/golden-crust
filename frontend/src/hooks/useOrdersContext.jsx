import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

export const useOrdersContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error('useOrdersContext must be used inside an OrdersContextProvider')
    }

    return context
}