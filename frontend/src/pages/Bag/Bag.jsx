import React from 'react'
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

    const { bag, loading: bagLoading } = useBagContext()
    const { products: allProducts, loading: productsLoading } = useProductsContext()

    let bagItems = null

    if (bag && allProducts) {
        bagItems = allProducts
            .filter(item => bag.hasOwnProperty(item._id))
            .map(item => ({ ...item, amount: bag[item._id] }))
    }

    if (bagLoading || productsLoading) {
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
                                            The cart is still empty, but this can be easily fixed. <br />Check out our selection and choose something delicious!
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
