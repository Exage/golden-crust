import { createContext, useEffect, useState } from "react"

export const CategoriesContext = createContext(null)

export const CategoriesContextProvider = ({ children }) => {
    const [categories, setCategories] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/category`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (!response.ok) {
                throw new Error('Failed to fetch categories')
            }

            const data = await response.json()
            
            setCategories(data)
            setError(null)

        } catch (error) {
            console.log(error)
            setError(error.message)
            console.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return (
        <CategoriesContext.Provider value={{ categories, loading, error }}>
            {children}
        </CategoriesContext.Provider>
    )
}