import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.scss'

import { useFetchCategories } from './hooks/useFetchCategories'
import { useFetchProducts } from './hooks/useFetchProducts'

import { Header } from './components/Header/Header'

import { Users } from './pages/Users/Users'
import { Orders } from './pages/Orders/Orders'
import { Products } from './pages/Products/Products'
import { ProductsCategories } from './pages/ProductsCategories/ProductsCategories'
import { ProductsList } from './pages/ProductsList/ProductsList'

function App() {
	return (
		<div className="App">
			<Header />
			<div className="container">
				<Routes>
					<Route index element={<Users />} />
					<Route path='/orders' element={<Orders />} />
					<Route path='/products' element={<Products />}>
						<Route path='categories' element={<ProductsCategories />} />
						<Route path='list' element={<ProductsList />} />
					</Route>
				</Routes>
			</div>
		</div>
	)
}

export default App
