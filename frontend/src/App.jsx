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
				<Route path='/account' element={user ? <Account /> : <Navigate to='/' />} />
				<Route path='/bag' element={<Bag />} />

				<Route path='*' element={<NotFound />} />
			</Routes>

			{!user && <SignIn showSignInModal={showSignInModal} setShowSignInModal={setShowSignInModal} />}
			{!user && <SignUp showSignUpModal={showSignUpModal} setShowSignUpModal={setShowSignUpModal} />}

			<Footer />
		</div>
	)
}

export default App
