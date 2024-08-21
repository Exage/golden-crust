import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.scss'

import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'

import { Home } from './pages/Home/Home'
import { Menu } from './pages/Menu/Menu'
import { Category } from './pages/Category/Category'
import { Location } from './pages/Location/Location'
import { AboutUs } from './pages/AboutUs/AboutUs'
import { PrivacyPolicy } from './pages/PrivacyPolicy/PrivacyPolicy'
import { Bag } from './pages/Bag/Bag'

import { SignIn } from './modals/SignIn/SignIn'
import { SignUp } from './modals/SignUp/SignUp'

function App() {

	const [showSignInModal, setShowSignInModal] = useState(false)
	const [showSignUpModal, setShowSignUpModal] = useState(false)

	return (
		<div className="App">
			<Header setShowSignInModal={setShowSignInModal} setShowSignUpModal={setShowSignUpModal} />
			
			<Routes>
				<Route index element={<Home />} />
				
				<Route path='/menu' element={<Menu />} /> 
				<Route path='/menu/:category' element={<Category />} />

				<Route path='/location' element={<Location />} />
				<Route path='/aboutus' element={<AboutUs />} />
				<Route path='/privacypolicy' element={<PrivacyPolicy />} />
				<Route path='/bag' element={<Bag />} />
			</Routes>

			<SignIn showSignInModal={showSignInModal} setShowSignInModal={setShowSignInModal} />
			<SignUp showSignUpModal={showSignUpModal} setShowSignUpModal={setShowSignUpModal} />

			<Footer />
		</div>
	)
}

export default App
