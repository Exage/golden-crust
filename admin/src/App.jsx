import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.scss'

import { useAuthContext } from './hooks/useAuthContext'

import { Header } from './components/Header/Header'

import { Login } from './pages/Login/Login'
import { Home } from './pages/Home/Home'
import { Users } from './pages/Users/Users'
import { Orders } from './pages/Orders/Orders'
import { Products } from './pages/Products/Products'
import { ProductsCategories } from './pages/ProductsCategories/ProductsCategories'
import { ProductsList } from './pages/ProductsList/ProductsList'

function App() {

	const { user, loading } = useAuthContext()

	if (loading) {
		return (
			<div className="App">
				<Header />
			</div>
		)
	}

	return (
		<div className="App">
			<Header />
			<div className="container">
				<Routes>
					{/* <Route index element={user ? <Users /> : <Navigate to='/signin' />} /> */}

					<Route path='/signin' element={!user ? <Login /> : <Navigate to='/' />} />

					<Route index element={user ? <Navigate to='/orders' /> : <Navigate to='/signin' />} />
					<Route path='/orders' element={user ? <Orders /> : <Navigate to='/signin' />} />
					<Route path='/products' element={user ? <Products /> : <Navigate to='/signin' />}>
						<Route path='categories' element={user ? <ProductsCategories /> : <Navigate to='/signin' />} />
						<Route path='list' element={user ? <ProductsList /> : <Navigate to='/signin' />} />
					</Route>
				</Routes>
			</div>
		</div>
	)
}

export default App
