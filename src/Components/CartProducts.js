import React from 'react'
import {ProductsInCart} from './ProductsInCart'
export const CartProducts = ({cartProducts,increaseProduct,decreaseProduct,deleteProduct}) => {
  return cartProducts.map((cartProduct)=>(
    <ProductsInCart key={cartProduct.ID} cartProduct={cartProduct} increaseProduct={increaseProduct} decreaseProduct={decreaseProduct} deleteProduct={deleteProduct}/>
  ))
}
