import React from 'react'

import { Items } from './components/Items'

export const Users = () => {
    return (
        <div className="page users">
            <div className="page__content">
                {/* {error && <div className="error">{error}</div>} */}
                {/* {isLoading ? 'loading' : <Items />} */}
                <Items />
            </div>
        </div>
    )
}
