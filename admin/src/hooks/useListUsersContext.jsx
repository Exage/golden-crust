import { ListUsersContext } from '../context/ListUsersContext'
import { useContext } from 'react'

export const useListUsersContext = () => {
    const context = useContext(ListUsersContext)

    if (!context) {
        throw Error('useListUsersContext must be used inside an ListUsersContextProvider')
    }

    return context
}