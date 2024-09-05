import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'

import './index.scss'

import { AuthContextProvider } from './context/AuthContext.jsx'
import { ListUsersContextProvider } from './context/ListUsersContext.jsx'
import { OrdersContextProvider } from './context/OrdersContext.jsx'
import { CategoriesContextProvider } from './context/CategoriesContext.jsx'
import { ProductsContextProvider } from './context/ProductsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthContextProvider>
				<ListUsersContextProvider>
					<OrdersContextProvider>
						<CategoriesContextProvider>
							<ProductsContextProvider>
								<App />
							</ProductsContextProvider>
						</CategoriesContextProvider>
					</OrdersContextProvider>
				</ListUsersContextProvider>
			</AuthContextProvider>
		</BrowserRouter>
	</React.StrictMode>
)
