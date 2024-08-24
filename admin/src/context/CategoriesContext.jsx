import { createContext, useEffect, useReducer } from "react"

export const CategoriesContext = createContext()

export const categoriesReducer = (state, action) => {
    switch (action.type) {
        case "SET_CATEGORIES":
            localStorage.setItem('golden-crust-admin-categories', JSON.stringify(action.payload))
            return {
                categories: action.payload
            }
        case "ADD_CATEGORY":
            localStorage.setItem('golden-crust-admin-categories', JSON.stringify([...state.categories, action.payload]))
            return {
                categories: [...state.categories, action.payload]
            }
        case 'UPDATE_CATEGORY':

            const updatedCategories = state.categories.map((item) =>
                item._id === action.payload._id ? { ...item, ...action.payload } : item
            )

            localStorage.setItem('golden-crust-admin-categories', JSON.stringify(updatedCategories))

            return {
                categories: updatedCategories
            }
        case 'DELETE_CATEGORY':
            const filteredCategories = state.categories.filter((item) => item._id !== action.payload._id)

            localStorage.setItem('golden-crust-admin-categories', JSON.stringify(filteredCategories))

            return {
                categories: filteredCategories
            }
    }
}

export const CategoriesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(categoriesReducer, {
        categories: null
    })

    // useEffect(() => {
    //     if (JSON.parse(localStorage.getItem('golden-crust-admin-categories'))) {
    //         localStorage.setItem('golden-crust-admin-categories', JSON.stringify(state.categories))
    //     }
    // }, [state.categories])

    return (
        <CategoriesContext.Provider value={{...state, dispatch}}>
            {children}
        </CategoriesContext.Provider>
    )
}