import api from './api'

export interface ProductInterface{
    id: string
    logo: string
    name: string
    value: number
}

interface GetResponse{
products: ProductInterface[]

}

export const getProducts = async () =>{
    const products = await  api.get<GetResponse>('/products')
    return products.data.products
}

export const addProduct = async (product:ProductInterface) =>{
        return await api.post('/add', product)
}

export const editProduct = async (product:ProductInterface) => {
    return await api.put(`product/update/${product.id}`, product)
}

export const deleteProduct = async (product:ProductInterface) => {
    return await api.delete(`product/delete/${product.id}`)
}