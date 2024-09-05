import React from 'react'
import { useOrdersContext } from '../../../hooks/useOrdersContext'

import './Items.scss'

import { Item } from './Item'

export const Items = () => {

    const { orders } = useOrdersContext()

    return (
        <div className="page__items">
            {orders && orders.map(item => <Item key={item._id} data={item} />)}
        </div>
    )
}
