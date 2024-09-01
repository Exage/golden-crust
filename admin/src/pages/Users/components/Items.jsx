import React from 'react'
import { Item } from './Item'

import { useListUsersContext } from '../../../hooks/useListUsersContext'

import './Items.scss'

export const Items = () => {

    const { users, loading } = useListUsersContext()

    return (
        <div className="page__items">
            {loading && <h1>Loading...</h1>}
            {users && users.map(item => <Item key={item._id} data={item} />)}
        </div>
    )
}
