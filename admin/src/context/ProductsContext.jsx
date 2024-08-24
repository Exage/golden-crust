import { createContext, useReducer } from "react"

export const ProductsContext = createContext()

export const productsReducer = (state, action) => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return {
                products: action.payload
            }
        case "ADD_PRODUCT":
            return {
                products: [...state.products, action.payload]
            }
        case 'UPDATE_PRODUCT':
            return {
                products: state.products.map((item) =>
                    item._id === action.payload._id ? { ...item, ...action.payload } : item
                )
            }
        case 'DELETE_PRODUCT':
            return {
                products: state.products.filter((item) => item._id !== action.payload._id)
            }
    }
}

export const ProductsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productsReducer, {
        products: null
    })

    return (
        <ProductsContext.Provider value={{...state, dispatch}}>
            {children}
        </ProductsContext.Provider>
    )
}