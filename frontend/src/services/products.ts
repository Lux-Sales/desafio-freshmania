import api from './api'

export interface ProductInterface {
    id: string
    name: string
    logo: string
    value: number
}

interface GetResponse {
    products: ProductInterface[]
}

export const getProducts = async () => {
    const products = await api.get<GetResponse>('/products')
    return products.data.products
}

export const addProduct = async (product: ProductInterface, logo: File | undefined) => {
    let formData = new FormData()
    formData.append('name', product.name)
    formData.append('value', product.value.toString())
    if (logo)
        formData.append('logo', logo)
    return await api.post('/add', formData)
}

export const editProduct = async (product: ProductInterface) => {
    return await api.put(`product/update/${product.id}`, product)
}

export const deleteProduct = async (product: ProductInterface) => {
    return await api.delete(`product/delete/${product.id}`)
}