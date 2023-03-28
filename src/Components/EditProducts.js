import React, { useEffect, useState } from 'react'
import {fs} from '../Config/Config'
import EditProduct from './EditProduct';

export const EditProducts = () => {
    const [products,setProducts]=useState([]);
    const getProducts=async ()=>{
    const products=await fs.collection('Products').get()
    const productsArray=[]
    for (var snap of products.docs) {
      var data=snap.data()
      data.ID=snap.id
      productsArray.push({
        ...data
      })
      if(productsArray.length===products.docs.length){
        setProducts(productsArray)
      }
    }
  }
  useEffect(()=>{
    getProducts();
  },[])
  return (

            products.length>0 ?
              <div className="container">
                <h3 className="mt-3 mb-5 text-muted text-center">Sửa thông tin sản phẩm</h3>
                <div className="row">
                  <EditProduct products={products}/>
                </div>
              </div>
                
            :
            <div className='text-center mt-5'>
                <i className="fa fa-circle-o-notch fa-spin fa-4x fa-fw mb-3"></i>
            </div>

  )
}
