import { BagContext } from '../context/BagContext'
import { useContext } from 'react'

export const useBagContext = () => {
    const context = useContext(BagContext)

    if (!context) {
        throw Error('useBagContext must be used inside an BagContextProvider')
    }

    return context
}