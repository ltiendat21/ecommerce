import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import {MainBackground} from "./HomeStyle"
import {auth} from '../Config/Config'
export const Login = () => {
    let navigate  = useNavigate();
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const [errorMsg,setErrorMsg]=useState('')
    const [successMsg,setSuccessMsg]=useState('')

    const handleLogin=(e)=>{
            e.preventDefault();
            auth.signInWithEmailAndPassword(email,password).then(()=>{
                setSuccessMsg("Đăng nhập thành công")
                setEmail('');
                setPassword('');
                setErrorMsg('');
                setTimeout(()=>{
                    setSuccessMsg('');
                    navigate('/')
                },500)
            }).catch(error=>setErrorMsg("Email hoặc mật khẩu không chính xác, bạn hãy kiểm tra lại!"));
    }
  return (
        <MainBackground>
        <div className='container'>
            <div className='row'>
                <div className='col-3'></div>
                <div className='col-6 card mt-3'>
                    <h3 className='text-center mt-3 mb-3'>Đăng Nhập</h3>

                    {successMsg?
                        <div className="alert alert-primary" role="alert">
                            {successMsg}
                        </div>:
                        <div></div>
                    }
                    <form className="form-group" onSubmit={handleLogin}>

                        <label >Email</label>
                        <input type="Email"className="form-control mb-3" placeholder="a@gmail.com" required onChange={(e)=>setEmail(e.target.value)}/>

                        <label >Mật khẩu</label>
                        <input type="password"className="form-control" placeholder="123456" required onChange={(e)=>setPassword(e.target.value)}/>

                        <div className='text-right mt-3 mb-3    '>
                            <span className='mr-5'>Nếu chưa có tài khoản<Link to="/signup" style={{textDecoration:"none"}}> Đăng ký tại đây</Link></span>
                            <button type='submit' className='btn btn-success btn-md'>Đăng Nhập</button>
                        </div>

                    </form>

                    {errorMsg?
                        <div className="alert alert-danger " role="alert">
                            {errorMsg}
                        </div>:
                        <div></div>
                    }

                </div>
            </div>
        </div>
        </MainBackground>
  )
}
