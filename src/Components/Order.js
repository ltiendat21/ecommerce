import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';

export const Order = () => {
    const location = useLocation()
    const form = useRef();
    const [successMsg,setSuccessMsg]=useState("")
    let cartProducts=location.state.cartProducts.cartProducts
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_k4puvnd', 'template_d1ovwkh', form.current, 'Qkw6Obkw7T15KFqzN')
        .then((result) => {
            setSuccessMsg("Đặt hàng thành công. Vui lòng kiểm tra đơn hàng tại Email của bạn.")
        }, (error) => {
            console.log(error.text);
        });
    };
    console.log(cartProducts);
  return (
    <div>
        <Navbar/>
        <div className='container'>
            <div className='row'>
                <div className='col-2'></div>
                <div className='col-8'>
                    <h3 className='text-center mt-2 mb-3'>Hoàn thành thông tin đặt hàng</h3>
                    <form ref={form} onSubmit={sendEmail} className="card px-1 py-1">
                        {successMsg?
                            <div className="alert alert-primary mb-1" role="alert">
                                {successMsg}
                            </div>:
                            <div></div>
                        }
                        <label >Họ và tên </label>
                        <input type="text" className="form-control mb-3" name="user_name" id="" aria-describedby="helpId" required/>
                        <label >Email </label>
                        <input type="email" className="form-control mb-3" name="user_email" id="" aria-describedby="helpId" required />
                        <label >Địa chỉ</label>
                        <textarea className="form-control mb-3" name="address" id="" aria-describedby="helpId" required/>
                        {
                        Array.isArray(cartProducts)?
                        cartProducts.map((cartProduct)=>(
                            <div key={cartProduct.ID}>
                                <input type="hidden" className="form-control mb-3" name="product_name" defaultValue={` `+cartProduct.title  }  required/>
                                <input type="hidden" className="form-control mb-3" name="qty" defaultValue={` `+cartProduct.qty} required/>
                                <input type="hidden" className="form-control mb-3" name="totalProductPrice" defaultValue={`$ `+cartProduct.totalPrice} required/>
                            </div>
                        ))
                        :
                        null
                        }
                        <input type="hidden" className="form-control mb-3" name="totalQty" id="" aria-describedby="helpId" defaultValue={location.state.totalQty.totalQty} required/>
                        <input type="hidden" className="form-control mb-3" name="totalPrice" id="" aria-describedby="helpId" defaultValue={`$ `+location.state.totalPrice.totalPrice} required/>
                        <button type='submit' className='btn btn-success float-right'>Xác Nhận</button>
                    </form>
                </div>
            </div>
        </div>            
    </div>
  );
};