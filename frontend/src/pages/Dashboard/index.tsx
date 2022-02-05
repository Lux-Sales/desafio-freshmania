import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header'
import Product from '../../components/Product'
import { ProductsDiv, Container } from './styles'
import { getProducts, ProductInterface } from '../../services/products'
import ProductContext from '../../context/product'

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<ProductInterface[]>([])

  const { refresh, setRefresh } = useContext(ProductContext)

  const fetchProducts = async () => {
    const products = await getProducts()
    setProducts(products)
    setRefresh(false)
  }
  
  useEffect(() => {
    fetchProducts()
  }, [refresh])

  return (
    <>
      <Container>
        <Header />
        <Product
        product={{
          id:"uploading",
          name:"",
          logo:"",
          value:0
        }}
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
