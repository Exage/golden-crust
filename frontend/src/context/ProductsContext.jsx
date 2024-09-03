import { createContext, useEffect, useState } from "react"

export const ProductsContext = createContext(null)

export const ProductsContextProvider = ({ children }) => {
    const [products, setProducts] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/list`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (!response.ok) {
                throw new Error('Failed to fetch categories')
            }

            const json = await response.json()
            
            setProducts(json.data)
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
        fetchProducts()
    }, [])

    return (
        <ProductsContext.Provider value={{ products, loading, error }}>
            {children}
        </ProductsContext.Provider>
    )
}