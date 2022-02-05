import React, { createContext, useState } from 'react'
import { ProductInterface } from '../../services/products'


interface PropsProductContext {
    state: ProductInterface
    setState: React.Dispatch<React.SetStateAction<ProductInterface>>
    refresh: boolean
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}

export const DEFAULT_VALUE = {
    state: {
        id:"default",
        name: "default",
        logo: "",
        value: 0
    },
    setState: () => {},
    refresh: false,
    setRefresh: () => {}
}

const ProductContext = createContext<PropsProductContext>(DEFAULT_VALUE)

const ProductContextProvider: React.FC = ({ children }) => {
    const [state, setState,] = useState(DEFAULT_VALUE.state)
    const [refresh, setRefresh] = useState(false)
    return (
        <ProductContext.Provider
            value={{
                state,
                setState,
                refresh,
                setRefresh
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}

export { ProductContextProvider }
export default ProductContext