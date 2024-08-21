import { createContext } from "react"

import products from '../utils/products.json'
import categories from '../utils/categories.json'

export const StoreContext = createContext(null)

export const StoreContextProvider = ({children}) => {
    const contextValue = {
        products,
        categories
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}