import React from 'react'


export const ProductsInCart = ({cartProduct,increaseProduct,decreaseProduct,deleteProduct}) => {
  const handleIncreaseProduct=()=>{
    increaseProduct(cartProduct)
  }
  const handleDecreaseProduct=()=>{
    decreaseProduct(cartProduct)
  }
  const handleDeleteProduct=()=>{
    // 
    if(window.confirm("Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?")===true){
      deleteProduct(cartProduct)
    }
    else{

    }
  }
  return (
      <div className='col-3 card mb-3 text-center ml-5 mr-1'>
        <div className='product container py-1'>
          <div className='product-img'>
              <img src={cartProduct.url} alt="product-img" className='img-fluid' style={{width:"250px", height:"220px"}}/>
          </div>
          <div className='product-text title'>{cartProduct.title}</div>
          <div className='product-text description'>{cartProduct.description}</div>
          <div className='product-text price'>$ {cartProduct.price}</div>
          <div className='mb-1 form-control card-text'>
              <span className="fa fa-plus float-left ml-3 mt-1" onClick={handleIncreaseProduct}></span>           
                <span className='text-center'> {cartProduct.qty} </span>           
              <span className="fa fa-minus float-right mr-3 mt-1" onClick={handleDecreaseProduct}></span>
          </div>
          <div className='product-text cart-price'>Tổng số tiền: <span style={{color:"red"}}>$ {cartProduct.totalPrice}</span></div>
          <div className='btn btn-danger btn-md cart-btn' onClick={handleDeleteProduct}>Xóa</div>            
        </div>
      </div>
  )
}
