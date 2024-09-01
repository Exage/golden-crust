import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { BagContextProvider } from './context/BagContext.jsx'
import { CategoriesContextProvider } from './context/CategoriesContext.jsx'
import { ProductsContextProvider } from './context/ProductsContext.jsx'

import { GoogleOAuthProvider } from '@react-oauth/google'

import App from './App.jsx'

import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
				<CategoriesContextProvider>
					<ProductsContextProvider>
						<AuthContextProvider>
							<BagContextProvider>
								<App />
							</BagContextProvider>
						</AuthContextProvider>
					</ProductsContextProvider>
				</CategoriesContextProvider>
			</GoogleOAuthProvider>
		</BrowserRouter>
	</React.StrictMode>
)
