import React from 'react'
import { Product } from './Product';

export const Products = ({products,AddToCart,searchText}) => {

  let searchProducts = products.filter(product=>product.title.toLowerCase().includes(searchText.toLowerCase()))
  return (
    products.length===searchProducts.length?
    products.map((product)=>
      <Product key={product.ID} product={product} AddToCart={AddToCart}/>
    )
    :
    searchProducts.map((product)=>
      <Product key={product.ID} product={product} AddToCart={AddToCart}/>
    )
  )
}
