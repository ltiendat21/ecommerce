import React from 'react'
import {HoverProduct} from './HomeStyle'
export const Product = ({product,AddToCart}) => {
    const handleAddToCart=()=>{
       AddToCart(product)
    }
  return (
    
    <HoverProduct className='product card col-3 text-left'>
        <div className='product-img text-center'>
            <img src={product.url} alt="product-img" className='img-fluid' style={{width:"250px", height:"220px"}}/>
        </div>
        <div className='product-text title font-weight-bold mt-2'>{product.title}</div>
        <div className='product-text description'>{product.description}</div>
        <div className='product-text price'>$ {product.price}</div>
        <div className='btn btn-danger btn-md cart-btn mb-1 mt-1' onClick={handleAddToCart}>Thêm vào giỏ hàng</div>
    </HoverProduct>

  )
}
