import { createContext, useEffect, useReducer } from "react"

export const CategoriesContext = createContext()

export const categoriesReducer = (state, action) => {
    switch (action.type) {
        case "SET_CATEGORIES":
            return {
                categories: action.payload
            }
        case "ADD_CATEGORY":
            return {
                categories: [...state.categories, action.payload]
            }
        case 'UPDATE_CATEGORY':
            return {
                categories: state.categories.map((item) =>
                    item._id === action.payload._id ? { ...item, ...action.payload } : item
                )
            }
        case 'DELETE_CATEGORY':
            return {
                categories: state.categories.filter((item) => item._id !== action.payload._id)
            }
    }
}

export const CategoriesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(categoriesReducer, {
        categories: null
    })

    return (
        <CategoriesContext.Provider value={{ ...state, dispatch }}>
            {children}
        </CategoriesContext.Provider>
    )
}