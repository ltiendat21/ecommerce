import React,{useState,useEffect} from 'react'
import { Navbar } from './Navbar'
import {Products} from './Products'
import {auth,fs} from '../Config/Config'
import { useNavigate } from 'react-router-dom';
export const Home = () => {
  let navigate  = useNavigate();

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

  const [uid,setUid]=useState(null)
  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user!==null){
        setUid(user.uid)
      }
    })
  },[])
  let Cart
  const AddToCart=(product)=>{
    if(uid!==null){
      Cart=product
      Cart['idP']=product.ID
      Cart['qty']=1
      Cart['totalPrice']=Cart.qty*Cart.price
      fs.collection('Cart '+uid).doc(product.ID).set(Cart).then(()=>{
        console.log("success");
      })
    }
    else{
      navigate("/login")
    }
  }

  const [total, setTotal]=useState(0);
    // getting cart products   
    useEffect(()=>{        
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                    const qty = snapshot.docs.length;
                    setTotal(qty);
                })
            }
        })       
    },[]) 

    const [searchText,setSeachText]=useState('')
    const getSearch = (search) => {
      setSeachText(search);
    }
  return (
    <div>
      <Navbar user={user} total={total} getSearch={getSearch}/>
      {
        products.length>0 ? 
        <div className='container'>
          <h3 className='text-center mt-3 mb-4'>Danh sách sản phẩm</h3>
          <div className='row ml-1'>
            <Products products={products} AddToCart={AddToCart} searchText={searchText}/>

          </div> 
        </div>
        :
        <div className='text-center mt-5'>
          <i className="fa fa-circle-o-notch fa-spin fa-4x fa-fw mb-3"></i>
        </div>
      }
    </div>
  )
}
