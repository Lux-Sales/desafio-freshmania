import api from './api'

export interface ProductInterface{
    logo: string,
    name: string,
    value: number
}

interface GetResponse{
products: ProductInterface[]

}

export const getProducts = async () =>{
    const products = await  api.get<GetResponse>('/products')
    return products.data.products
}