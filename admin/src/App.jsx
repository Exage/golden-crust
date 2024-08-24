import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.scss'

import { useFetchCategories } from './hooks/useFetchCategories'
import { useFetchProducts } from './hooks/useFetchProducts'

import { Header } from './components/Header/Header'

import { Users } from './pages/Users/Users'
import { Orders } from './pages/Orders/Orders'
import { Categories } from './pages/Categories/Categories'
import { Products } from './pages/Products/Products'

function App() {
	return (
		<div className="App">
			<Header />
			<div className="container">
				<Routes>
					<Route index element={<Users />} />
					<Route path='/orders' element={<Orders />} />
					<Route path='/categories' element={<Categories />} />
					<Route path='/products' element={<Products />} />
				</Routes>
			</div>
		</div>
	)
}

export default App
