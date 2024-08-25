import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'

import './index.scss'

import { ProductsContextProvider } from './context/ProductsContext.jsx'
import { CategoriesContextProvider } from './context/CategoriesContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<CategoriesContextProvider>
				<ProductsContextProvider>
					<App />
				</ProductsContextProvider>
			</CategoriesContextProvider>
		</BrowserRouter>
	</React.StrictMode>
)
