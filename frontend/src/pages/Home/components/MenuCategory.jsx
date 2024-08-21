import React, { useContext } from 'react'
import { ReactSVG } from 'react-svg'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import { StoreContext } from '../../../context/StoreContext'

import './MenuCategory.scss'

import decorationLeft from '../../../assets/home/menu/home-menu-category-decoration-left.svg'
import decorationRight from '../../../assets/home/menu/home-menu-category-decoration-right.svg'

import { Product } from '../../../components/Product/Product'

export const MenuCategory = ({ title, name, subtitle, primaryColor = '#616161', secondaryColor = '#d3d3d3' }) => {

    const { products } = useContext(StoreContext)
    const currentProducts = products.filter(product => product.category === name)

    return (
        <div className="menu__category" style={{ backgroundColor: secondaryColor }}>
            <div className="container">
                <div className="menu__category-header">
                    <div className="menu__category-header__title-wrapper">
                        <ReactSVG
                            src={decorationLeft}
                            className="menu__category-header__title-decoration menu__category-header__title-decoration__left"
                            style={{ fill: primaryColor }}
                        />

                        <h1
                            className="menu__category-header__title"
                            style={{ backgroundColor: primaryColor, borderColor: secondaryColor }}
                        >
                            {title}
                        </h1>

                        <ReactSVG
                            src={decorationRight}
                            className="menu__category-header__title-decoration menu__category-header__title-decoration__right"
                            style={{ fill: primaryColor }}
                        />
                    </div>
                    <p className="menu__category-header__subtitle">{subtitle}</p>
                </div>
                <div className="menu__category-body">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        breakpoints={{
                            630: {
                                slidesPerView: 2
                            },
                            960: {
                                slidesPerView: 3,
                            },
                            1290: {
                                slidesPerView: 4,
                            }
                        }}
                    >
                        {currentProducts.slice(0, 4).map(item => (
                            <SwiperSlide key={item._id}>
                                <Product
                                    data={item}

                                    primaryColor={primaryColor}
                                    secondaryColor={secondaryColor}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}
