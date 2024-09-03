import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useBagContext } from '../../hooks/useBagContext'
import { useProductsContext } from '../../hooks/useProductsContext'

import './Bag.scss'

import { Title } from '../../components/Title/Title'
import noProductsIcon from '../../assets/bag/cookies.svg'

import { Loader } from '../../components/Loader/Loader'

import { Products } from './components/Products/Products'
import { Checkout } from './components/Checkout/Checkout'

export const Bag = () => {

    const [bagItems, setBagItems] = useState(null)

    const { bag, loading } = useBagContext()
    const { products } = useProductsContext()

    useEffect(() => {
        if (bag) {
            
            const items = products
                .filter(item => bag.hasOwnProperty(item._id))
                .map(item => ({ ...item, quantity: bag[item._id] }))

            setBagItems(items)
        }
    }, [bag])


    if (loading) {
        return (
            <div className="page__padding">
                <div className='bag page'>
                    <div className="container">

                        <Title>Bag</Title>

                        <div className="bag__wrapper">
                            <Loader />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="page__padding">
            <div className={`bag page${bagItems && bagItems.length === 0 ? ' noproducts' : ''}`}>
                <div className="container">

                    <Title>Bag</Title>

                    <div className="bag__wrapper">
                        {bagItems && (
                            <>
                                {bagItems.length === 0 && (
                                    <div className="bag__wrapper-noproducts">
                                        <img className="bag__wrapper-noproducts__img" src={noProductsIcon} alt="" />
                                        <h1 className="bag__wrapper-noproducts__title">
                                            Your Bag is empty
                                        </h1>
                                        <p className="bag__wrapper-noproducts__text">
                                            <span>The bag is still empty, but this can be easily fixed. </span> 
                                            <span>Check out our selection and choose something delicious!</span>
                                        </p>
                                        <Link to='/' className="bag__wrapper-noproducts__link">continue shoping</Link>
                                    </div>
                                )}
                                {bagItems.length > 0 && (
                                    <>
                                        <Products bagItems={bagItems} />
                                        <Checkout bagItems={bagItems} />
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
