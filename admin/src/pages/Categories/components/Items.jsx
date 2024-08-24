import React, { useEffect, useState } from 'react'
import { useCategoriesContext } from '../../../hooks/useCategoriesContext'
import { Item } from './Item'

import './Items.scss'

export const Items = () => {

    const { categories } = useCategoriesContext()
    const [displayCategories, setDisplayCategories] = useState(null)

    useEffect(() => {
        setDisplayCategories(categories)
    }, [categories])

    return (
        <div className="items">
            {displayCategories && displayCategories.map(item => <Item key={item._id} data={item}/>)}
        </div>
    )
}
