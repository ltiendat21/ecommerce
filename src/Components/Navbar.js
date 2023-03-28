import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Logo from '../Images/Logo.png'
import {NavLink} from './HomeStyle'
import {auth} from '../Config/Config'
export const Navbar = ({user,totalProducts,total,getSearch}) => {
  let navigate  = useNavigate();
  const [search,setSearch]=useState('');

  const handleLogout=()=>{
    auth.signOut().then(()=>{
      navigate("/login")
    })
  }

  const handlePressEnter=(e)=>{
    if (e.key==='Enter'){
      getSearch(search)
    }
  }
  // console.log(search);
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light bg-info">
        <Link className="navbar-brand ml-2" to="/"><img  src={Logo} className="img-fluid" style={{width:"105px", height:"56px"}} alt="ecommerce"/></Link>
        <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
            aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
        <div className="form-inline my-2 my-lg-0 form-group">
          <input className="form-control" type="text" placeholder="Search" onChange={(e)=>setSearch(e.target.value)} onKeyDown={handlePressEnter}/>
          <button className="btn btn-secondary" onClick={() => getSearch(search)}><i className='fa fa-search'></i></button>
        </div>


        {
          user?
          <div className='ml-auto'>
            <div className='text-center'>
              <span className='text-white mr-3' style={{fontSize:"23px"}}><Link className='navlink text-white' style={{textDecoration:"none"}} to="/"> {user}</Link></span>
              <Link className='navlink' to="/cart">
                <p className="fa fa-shopping-cart mt-3" style={{fontSize:"30px",color:"white"}}></p>
              </Link>
              <span className='px-1' style={{backgroundColor:"red", color:"white",fontSize:"12px",borderRadius:"5px"}}>{total === undefined? totalProducts:total} </span>
              <span className='btn btn-danger ml-3 mb-4' onClick={handleLogout}>LOGOUT</span>
            </div>

          </div>
          :
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0" style={{fontSize:"21px", fontWeight: '600'}}>
          <NavLink className="nav-item active">
            <Link className="nav-link text-white mr-1" to="/login">LOGIN <span className="sr-only">(current)</span></Link>
          </NavLink>
          <NavLink clasName="nav-item">
            <Link className="nav-link text-white" to="/signup">SIGN UP</Link>
          </NavLink>
        </ul>
        }


        </div>
      </nav>
    </div>
  )
}
