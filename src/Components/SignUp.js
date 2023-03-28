import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import {MainBackground} from "./HomeStyle"
import {auth,fs} from '../Config/Config'
export const Signup = () => {

    let navigate  = useNavigate();

    const [fullName,setFullName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const [errorMsg,setErrorMsg]=useState('')
    const [successMsg,setSuccessMsg]=useState('')

    // const handleSignUp=(e)=>{
    //     e.preventDefault();
    //     auth.createUserWithEmailAndPassword(email,password).then((credentials)=>{
    //         console.log(credentials);
    //         fs.collection('users').doc(credentials.user.uid).set({
    //             FullName:fullName,
    //             Email:email,
    //             Password:password
    //         }).then(()=>{
    //             setSuccessMsg('SignUp Successfull')
    //             setFullName('');
    //             setEmail('');
    //             setPassword('');
    //             setErrorMsg('');
    //             setTimeout(()=>{
    //                 setSuccessMsg('');
    //                 navigate("/login");
    //             },3000)
    //         }).catch(error=>setErrorMsg(error.message))
    //     }).catch((error)=>{
    //         setErrorMsg(error.message)
    //     })  
    // }
    const handleSignUp=(e)=>{
        e.preventDefault();
        // console.log(fullName, email, password);
        auth.createUserWithEmailAndPassword(email,password).then((credentials)=>{
            console.log(credentials);
            fs.collection('users').doc(credentials.user.uid).set({
                FullName: fullName,
                Email: email,
                Password: password
            }).then(()=>{
                setSuccessMsg('Đăng ký thành công');
                setFullName('');
                setEmail('');
                setPassword('');
                setErrorMsg('');
                setTimeout(()=>{
                    setSuccessMsg('');
                    navigate('/login')
                },2500)
            }).catch(error=>setErrorMsg(error.message));
        }).catch((error)=>{
            setErrorMsg("Email đã tồn tại")
        })
    }

  return (
    <MainBackground>
        <div className='container'>
            <div className='row'>
                <div className='col-3'></div>
                <div className='col-6 card mt-3'>
                    <h3 className='text-center mt-3 mb-3'>Đăng ký</h3>

                    {successMsg?
                        <div className="alert alert-primary" role="alert">
                            {successMsg}
                        </div>:
                        <div></div>
                    }
                    <form className="form-group" onSubmit={handleSignUp}>
                        <label >Họ và Tên</label>
                        <input type="text"className="form-control mb-3" placeholder="Nguyễn Văn A" required onChange={(e)=>setFullName(e.target.value)}/>

                        <label >Email</label>
                        <input type="Email"className="form-control mb-3" placeholder="a@gmail.com" required onChange={(e)=>setEmail(e.target.value)}/>

                        <label >Mật khẩu</label>
                        <input type="password"className="form-control mb-3" placeholder="123456" required onChange={(e)=>setPassword(e.target.value)}/>

                        <div className='text-right mt-3'>
                            <span className='mr-5'>Nếu có tài khoản<Link to="/login" style={{textDecoration:"none"}}> Đăng nhập tại đây</Link></span>
                            <button type='submit' className='btn btn-success btn-md'>Đăng ký</button>
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
