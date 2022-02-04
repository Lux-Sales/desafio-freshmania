import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Product from '../../components/Product'
import { ProductsDiv, Container } from './styles'
import { getProducts, ProductInterface } from '../../services/products'

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<ProductInterface[]>([])

  const fetchProducts = async () => {
    const products = await getProducts()
    setProducts(products)
  }
  
  useEffect(() => {
    fetchProducts()
    console.log('wee', products)
  }, [])

  return (
    <>
      <Container>
        <Header />
        <Product
        product={undefined} 
        isUpload={true} />
        <ProductsDiv>
          {products && products.map((product) => {
            return (
              <Product
              product={product} 
              isUpload={false} 
              />
            )
          })}
        </ProductsDiv>
      </Container>
    </>
  )
}


export default Dashboard
