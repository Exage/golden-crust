import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.scss'

import { useAuthContext } from './hooks/useAuthContext'

import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'

import { Home } from './pages/Home/Home'
import { Menu } from './pages/Menu/Menu'
import { Category } from './pages/Category/Category'
import { Location } from './pages/Location/Location'
import { AboutUs } from './pages/AboutUs/AboutUs'
import { PrivacyPolicy } from './pages/PrivacyPolicy/PrivacyPolicy'
import { Account } from './pages/Account/Account'
import { Bag } from './pages/Bag/Bag'
import { Verify } from './pages/Verify/Verify'
import { MyOrders } from './pages/MyOrders/MyOrders'
import { NotFound } from './pages/NotFound/NotFound'

import { SignIn } from './modals/SignIn/SignIn'
import { SignUp } from './modals/SignUp/SignUp'

function App() {

	const { user } = useAuthContext()

	const [showSignInModal, setShowSignInModal] = useState(false)
	const [showSignUpModal, setShowSignUpModal] = useState(false)

	useEffect(() => {
		if (user) {
			document.body.classList.remove('noscroll')
		}
	}, [user])

	return (
		<div className="App">
			<Header setShowSignInModal={setShowSignInModal} setShowSignUpModal={setShowSignUpModal} />

			<Routes>
				<Route index element={<Home />} />

				<Route path='/menu' element={<Menu />} />
				<Route path='/menu/:categoryName' element={<Category />} />

				<Route path='/location' element={<Location />} />
				<Route path='/aboutus' element={<AboutUs />} />
				<Route path='/privacypolicy' element={<PrivacyPolicy />} />
				<Route path='/account' element={user !== 'guest' ? <Account /> : <Navigate to='/' />} />
				<Route path='/verify' element={<Verify />} />
				<Route path='/bag' element={<Bag />} />
				<Route path='/myorders' element={<MyOrders />} />

				<Route path='*' element={<NotFound />} />
			</Routes>

			{user === 'guest' && <SignIn showModal={showSignInModal} setShowModal={setShowSignInModal} />}
			{user === 'guest' && <SignUp showModal={showSignUpModal} setShowModal={setShowSignUpModal} />}

			<Footer />
		</div>
	)
}

export default App
