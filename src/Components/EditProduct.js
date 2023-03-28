import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import {fs} from '../Config/Config'
import {HoverProduct} from './HomeStyle'

const EditProduct = ({products}) => {
    let navigate  = useNavigate();
    const deleteProduct = (product)=>{
        if(window.confirm("Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?")===true){
            fs.collection('Products').doc(product.ID).delete().then(()=>{
                setTimeout(() => {
                    navigate('/editProducts');
                }, 1000);
              })
          }
          else{
      
          }
    }
  return (
    products.map((product) =>
    <HoverProduct className='product card col-3' key={product.ID}>
        <div className='product-img text-center'>
            <img src={product.url} alt="product-img" className='img-fluid mb-1' style={{width:"250px", height:"220px"}}/>
        </div>
        <div className='product-text title font-weight-bold'>{product.title}</div>
        <div className='product-text description'>{product.description}</div>
        <div className='product-text price'>$ {product.price}</div>
        <div className='btn-group'>
            <Link to="/edit" state={product} className='btn btn-outline-warning' ><span className="fa fa-pencil mr-1"></span>Edit</Link>
            <div className='btn btn-outline-danger' onClick={()=>deleteProduct(product)}><span className="fa fa-trash mr-1"></span>Delete</div>
        </div>
    </HoverProduct>
    )
    )
}

export default EditProduct