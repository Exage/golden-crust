import React, { useState, useEffect, useCallback } from 'react'
import { ReactSVG } from 'react-svg'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import { useProductsContext } from '../../../hooks/useProductsContext'
import { Loader } from '../../../components/Loader/Loader'

import './MenuCategory.scss'

import decorationLeft from '../../../assets/home/menu/home-menu-category-decoration-left.svg'
import decorationRight from '../../../assets/home/menu/home-menu-category-decoration-right.svg'

import { Product } from '../../../components/Product/Product'

export const MenuCategory = ({ category }) => {

    const { title, name, description, primaryColor, secondaryColor } = category
    const { products, loading } = useProductsContext()

    const showProducts = products ? products.filter(product => product.category === name).slice(0, 4) : null

    const cardWidth = 300
    const cardGap = 30

    const calculateWrapperWidth = useCallback(() => {
        if (products) {
            if (showProducts.length === 0) return 'none'

            let slidesPerView
            if (window.innerWidth >= 1310) {
                slidesPerView = showProducts.length
            } else if (window.innerWidth >= 980) {
                slidesPerView = showProducts.length >= 4 ? 3 : showProducts.length
            } else if (window.innerWidth >= 650) {
                slidesPerView = showProducts.length >= 3 ? 2 : showProducts.length
            } else {
                return 'none'
            }

            return slidesPerView * cardWidth + (slidesPerView - 1) * cardGap
        }
    }, [showProducts, cardWidth, cardGap])

    const [wrapperWidth, setWrapperWidth] = useState(calculateWrapperWidth)

    useEffect(() => {
        const handleResize = () => setWrapperWidth(calculateWrapperWidth)
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [calculateWrapperWidth])

    return (
        <div className="home__menu-category" style={{ backgroundColor: secondaryColor }} data-section={name}>
            <div className="container">
                <div className="home__menu-category__header">
                    <div className="home__menu-category__header-title__wrapper">
                        <ReactSVG
                            src={decorationLeft}
                            className="decoration decoration__left"
                            style={{ fill: primaryColor }}
                        />

                        <h1
                            className="home__menu-category__header-title"
                            style={{ backgroundColor: primaryColor, borderColor: secondaryColor }}
                        >
                            {title}
                        </h1>

                        <ReactSVG
                            src={decorationRight}
                            className="decoration decoration__right"
                            style={{ fill: primaryColor }}
                        />
                    </div>
                    <p className="home__menu-category__header-subtitle">{description}</p>
                </div>
                <div
                    className="home__menu-category__body"

                    style={{
                        maxWidth: wrapperWidth
                    }}

                >

                    {loading && (
                        <div className="home__menu-category__loader">
                            <Loader />
                        </div>
                    )}
                    
                    {showProducts && (
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={30}
                            breakpoints={{
                                650: {
                                    slidesPerView: showProducts.length >= 3 ? 2 : showProducts.length
                                },
                                980: {
                                    slidesPerView: showProducts.length >= 4 ? 3 : showProducts.length,
                                },
                                1310: {
                                    slidesPerView: showProducts.length,
                                }
                            }}
                        >
                            {showProducts.map(item => (
                                <SwiperSlide key={item._id}>
                                    <Product
                                        data={item}

                                        primaryColor={primaryColor}
                                        secondaryColor={secondaryColor}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}

                </div>
            </div>
        </div>
    )
}
