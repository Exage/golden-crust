import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useBagContext } from './useBagContext'

export const useSubstractBagItem = () => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const { dispatch, bag } = useBagContext()
    const { user } = useAuthContext()

    const substractBagItem = async (id) => {
        setIsLoading(true)
        setError(null)
        setSuccess(null)

        if (!user) {
            setError('User not auth')
            return
        }

        if (user === 'guest') {
            const bagData = {...bag}

            if (bagData[id]) {
                if (bagData[id] > 1) {
                    bagData[id] -= 1
                } else {
                    delete bagData[id]
                }
            }

            localStorage.setItem('golden-crust-bag', JSON.stringify(bagData))
            dispatch({ type: "SET_BAG", payload: bagData })

            setIsLoading(false)

            return
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bag/substract/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'SET_BAG', payload: json.data })
            setIsLoading(false)
            setSuccess(json.message)
            return json
        }

        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
        }
    }

    return { isLoading, substractBagItem, error, success }
}
