import React from 'react'
import { ProductContextProvider } from './product'

const GlobalContext: React.FC = ({children}) => {
    return <ProductContextProvider>{children}</ProductContextProvider>
}

export default GlobalContext