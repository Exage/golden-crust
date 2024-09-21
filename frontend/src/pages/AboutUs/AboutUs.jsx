import React from 'react'

import './AboutUs.scss'

import { Title } from '../../components/Title/Title'

import photo1 from '../../assets/history/history-img-1.jpg'
import photo2 from '../../assets/history/history-img-2.jpg'
import photo3 from '../../assets/history/history-img-3.jpg'

export const AboutUs = () => {
    return (
        <div className="page__padding">
            <div className="aboutus page">
                <div className="container">

                    <Title>
                        Learn our history
                    </Title>

                    <div className="abouts__blocks">

                        <div className="abouts__block">
                            <div className="abouts__block-year__wrapper">
                                <div className="abouts__block-year">
                                    1976
                                </div>
                            </div>
                            <div className="abouts__block-text">
                                <h1 className="abouts__block-text__title">
                                    Golden Crust Bakery founded
                                </h1>
                                <p className="abouts__block-text__paragraph">
                                    The history of Golden Crust Bakery began in 1976, when Anna and Ivan Petrov decided to make their dream come true. Inspired by family traditions and love for baking, they opened a small bakery on a quiet street in the city center. At that time, only a few people worked in the bakery, but each of them treated their work with great care and attention.
                                </p>
                                <p className="abouts__block-text__paragraph">
                                    Anna chose the best ingredients from local markets herself, and Ivan did the baking, following recipes that had been passed down in their family for generations. The bakery quickly gained popularity thanks to the home-made taste of the pastries and the friendly atmosphere. It was a place where people gathered to enjoy the aromas of freshly baked bread and pies, discuss the latest news, and simply relax over a cup of tea.
                                </p>
                            </div>
                        </div>
                        <div className="abouts__block">
                            <div className="abouts__block-year__wrapper">
                                <div className="abouts__block-year">
                                    1980
                                </div>
                            </div>
                            <div className="abouts__block-text">
                                <h1 className="abouts__block-text__title">
                                    Expansion of the product range
                                </h1>
                                <p className="abouts__block-text__paragraph">
                                    The 1980s were a time of growth and change. Golden Crust Bakery gradually expanded its menu, adding new types of baked goods to traditional breads and pies: cinnamon rolls, flaky croissants, delicate muffins and airy cakes. The bakery attracted more and more customers, and the demand for its products grew every year.
                                </p>

                                <p className="abouts__block-text__paragraph">
                                    In 1982, Anna and Ivan decided to take the first step in expanding their business by opening a second branch. This decision allowed them to serve even more customers while maintaining high quality standards. By 1985, the bakery had become one of the most popular places in the city, where lines formed every morning for fresh pastries. The family atmosphere and unwavering commitment to tradition made Golden Crust Bakery a real center of attraction for local residents.
                                </p>

                                <img src={photo1} alt="" className='abouts__block-text__photo' />

                            </div>
                        </div>
                        <div className="abouts__block">
                            <div className="abouts__block-year__wrapper">
                                <div className="abouts__block-year">
                                    1990
                                </div>
                            </div>
                            <div className="abouts__block-text">
                                <h1 className="abouts__block-text__title">
                                    Family Values ​​and Rising Popularity
                                </h1>
                                <p className="abouts__block-text__paragraph">
                                    In the early 1990s, a new generation came to the bakery - Anna and Ivan's children, Maria and Alexey. Raised on family values ​​and respect for traditions, they brought with them fresh ideas and a new vision for business development.
                                </p>
                                <p className="abouts__block-text__paragraph">
                                    Maria, with her passion for experimentation, began introducing new recipes - from chocolate muffins to fruit and nut cakes, which instantly won the love of customers. Alexey, who studied cooking abroad, brought new baking techniques and improvements to the production process to the bakery.
                                </p>

                                <img src={photo2} alt="" className='abouts__block-text__photo' />

                            </div>
                        </div>
                        <div className="abouts__block">
                            <div className="abouts__block-year__wrapper">
                                <div className="abouts__block-year">
                                    2000
                                </div>
                            </div>
                            <div className="abouts__block-text">
                                <h1 className="abouts__block-text__title">
                                    Innovation and recognition
                                </h1>
                                <p className="abouts__block-text__paragraph">
                                    The new century brought new opportunities and challenges. In the 2000s, Golden Crust Bakery was innovating while staying true to its roots. In 2002, the bakery underwent a complete overhaul of its production facilities, increasing efficiency and product quality without sacrificing traditional baking methods.
                                </p>
                                <p className="abouts__block-text__paragraph">
                                    New technologies have helped speed up the baking process, while maintaining manual labor where necessary to maintain the original taste. In 2005, Golden Crust Bakery received prestigious awards for the best baked goods in the region, confirming its commitment to quality.
                                </p>
                                <p className="abouts__block-text__paragraph">
                                    This was an important stage in the development of the bakery, as it began to attract the attention of not only local residents, but also guests from other cities. Over this decade, Golden Crust Bakery has evolved from a small family bakery into a well-known brand, without losing its warmth and individual approach to each client.
                                </p>
                            </div>
                        </div>
                        <div className="abouts__block">
                            <div className="abouts__block-year__wrapper">
                                <div className="abouts__block-year">
                                    2010
                                </div>
                            </div>
                            <div className="abouts__block-text">
                                <h1 className="abouts__block-text__title">
                                    New generation and expanding boundaries
                                </h1>
                                <p className="abouts__block-text__paragraph">
                                    In the 2010s, the bakery came under the management of the third generation of the Petrov family. The founders' granddaughter, Olga, brought a fresh perspective on business and new directions to the bakery.
                                </p>
                                <p className="abouts__block-text__paragraph">
                                    Inspired by modern culinary trends, she expanded her baked goods range to include gluten-free, vegan and diet desserts. This move allowed the bakery to attract a new audience that valued health and a variety of flavours.
                                </p>
                                <p className="abouts__block-text__paragraph">
                                    Despite these innovations, Olga continued to maintain family traditions, carefully monitoring that each loaf of bread, each cake retained the same taste that our regular customers remembered. In 2015, Golden Crust Bakery took another important step by opening the possibility of online orders and delivery of baked goods. This allowed us to serve even more customers without leaving the cozy atmosphere of our bakeries.
                                </p>

                                <img src={photo3} alt="" className='abouts__block-text__photo' />

                            </div>
                        </div>
                        <div className="abouts__block">
                            <div className="abouts__block-year__wrapper">
                                <div className="abouts__block-year">
                                    2020
                                </div>
                            </div>
                            <div className="abouts__block-text">
                                <h1 className="abouts__block-text__title">
                                    Traditions continue
                                </h1>
                                <p className="abouts__block-text__paragraph">
                                    Today, more than 40 years after its foundation, Golden Crust Bakery continues to delight its customers. We are proud that we have been able to preserve the traditions established by Anna and Ivan back in 1976, and at the same time adapt to modern demands and technologies.
                                </p>
                                <p className="abouts__block-text__paragraph">
                                    Despite all the changes, our main goal remains unchanged - to make baked goods that bring joy and comfort to every home. We continue to use the best ingredients, strictly following proven recipes and making sure that each customer feels special.
                                </p>
                                <p className="abouts__block-text__paragraph">
                                    In the near future, we plan to expand our online services and open new branches so that even more people can enjoy our baked goods.
                                </p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div >
    )
}
