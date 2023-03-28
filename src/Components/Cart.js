import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {auth,fs} from '../Config/Config'
import { CartProducts } from './CartProducts';
import { Navbar } from './Navbar';


export const Cart = () => {
  const [user,setUser]=useState(null);
  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        fs.collection('users').doc(user.uid).get().then(snapshot=>{
          setUser(snapshot.data().FullName);
        })
      }
      else{
        setUser(null)
      }
    })
  },[])

  const [cartProducts,setCartProducts]=useState([])
  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        fs.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
          const newCartProduct=snapshot.docs.map((doc)=>({
            ID:doc.id,
            ...doc.data()
          }));
          setCartProducts(newCartProduct)
        })
      }
      else{
        console.log("đn");
      }
    })
  },[])

  let TempCart
  const increaseProduct=(cartProducts)=>{
    TempCart=cartProducts
    TempCart.qty=TempCart.qty+1
    TempCart.totalPrice=TempCart.price*TempCart.qty
    auth.onAuthStateChanged(user=>{
      if(user){
        fs.collection('Cart '+user.uid).doc(cartProducts.ID).update(TempCart).then(()=>{
          // console.log("success");
        })
      }
      else{
        console.log("Log in");
      }
    })
  }

  const decreaseProduct=(cartProducts)=>{
    TempCart=cartProducts
    if(TempCart.qty>1){
      TempCart.qty=TempCart.qty-1
      TempCart.totalPrice=TempCart.price*TempCart.qty
    }
    else{
      if(window.confirm("Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?")===true){
        deleteProduct(cartProducts)
      }
    }
    auth.onAuthStateChanged(user=>{
      if(user){
        fs.collection('Cart '+user.uid).doc(cartProducts.ID).update(TempCart).then(()=>{
          // console.log("success");
        })
      }
      else{
        console.log("Log in");
      }
    })
  }


  const deleteProduct=(cartProducts)=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        fs.collection('Cart '+user.uid).doc(cartProducts.ID).delete().then(()=>{
          console.log("success");
        })
      }
      else{
        console.log("Log in");
      }
    })
  }


  let totalQty=0
  let totalPrice=0
  for (let index = 0; index < cartProducts.length; index++) {
    totalQty=totalQty+cartProducts[index].qty
    totalPrice=totalPrice+cartProducts[index].totalPrice
  }


  const [totalProducts, setTotalProducts]=useState(0); 
  useEffect(()=>{        
      auth.onAuthStateChanged(user=>{
          if(user){
              fs.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                  const qty = snapshot.docs.length;
                  setTotalProducts(qty);
              })
          }
      })       
  },[]) 
  // var data=[{totalPrice:totalPrice,totalQty:totalQty}]

  return (
    <div>
      <Navbar user={user} totalProducts={totalProducts}/>

      {
        cartProducts.length > 0 ?
        <div className='container'>
          <h2 className='text-center mt-2'>Giỏ hàng của bạn</h2>
          <div className='row ml-5 mt-3'>
            {/* <div className='col-2'></div> */}
            <CartProducts cartProducts={cartProducts} increaseProduct={increaseProduct} decreaseProduct={decreaseProduct} deleteProduct={deleteProduct}/>
          </div>
        </div>:

        cartProducts.length===0?<div><h4 className='text-center'>Không có sản phẩm nào trong giỏ hàng</h4></div>:
        <div className='text-center mt-5'>
          <i className="fa fa-circle-o-notch fa-spin fa-4x fa-fw mb-3"></i>
        </div>
      }

      <div className='container mb-5'>
          <div className="card-header card">
            <h3>Tổng giỏ hàng</h3>
          </div>
          <div className="card-body card ">
            <h6 className="card-title card">Tổng số sản phẩm:  {totalQty}</h6>
            <h6 className="card-title card">Số tiền cần thanh toán: $ {totalPrice}</h6>
            <Link className="nav-link btn btn-primary btn-md" to="/order" state={{
              totalPrice:{totalPrice},
              totalQty:{totalQty},
              cartProducts:{cartProducts}
            }}>Đặt hàng</Link>
          </div>
      </div>
    </div>
  )
}
