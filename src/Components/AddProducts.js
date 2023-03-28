import React, { useState } from 'react'
import {storage,fs} from '../Config/Config'
export const AddProducts = () => {
    const [title,setTitle]=useState('')
    const [price,setPrice]=useState(0)
    const [description,setDescription]=useState('')
    
    const [image,setImage]=useState(null)
    const [imageError,setImageError]=useState()

    const [errorMsg,setErrorMsg]=useState('')
    const [successMsg,setSuccessMsg]=useState('')

    const Types=["image/jpg","image/png","image/jpeg","image/PNG"];
    const handleProductImg=(e)=>{
        let selectedFile = e.target.files[0];
        if(selectedFile){
            if(Types.includes(selectedFile.type)){
                setImage(selectedFile);
                setImageError('');
            }
            else{
                setImage(null);
                setImageError("Chọn tệp hình ảnh!")
            }
        }
        else{
            console.log('');
        }
    }
    const handleAddProducts=(e)=>{
        e.preventDefault()
        
        const uploadTask=storage.ref(`product-images/${image.name}`).put(image);
        uploadTask.on('state_changed',snapshot=>{
            const progress =Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100) 
            console.log(progress);
        },error=>setErrorMsg(error.message),()=>{
            storage.ref('product-images').child(image.name).getDownloadURL().then(url=>{
                fs.collection('Products').add({
                    title,
                    description,
                    price: Number(price),
                    url
                }).then(()=>{
                    setSuccessMsg("Thêm thành công")
                    setTitle('')
                    setDescription('')
                    setPrice('')
                    document.getElementById('file').value='';
                    setImageError('')
                    setErrorMsg('')
                    setTimeout(() => {
                        setSuccessMsg('');
                    }, 2000);
                }).catch(error=>setErrorMsg(error.message))
            })
        })
    }
  return (
    <div>
        <div className='container'>
            <div className='row'>
                <div className='col-2'></div>
                <div className='col-8 card mt-2'>
                    <h3 className='text-center mt-3'>Thêm sản phẩm</h3>
                    {successMsg?
                        <div className="alert alert-primary" role="alert">
                            {successMsg}
                        </div>:
                        <div></div>
                    }
                    <form className="form-group" onSubmit={handleAddProducts}>
                      <label >Tên sản phẩm</label>
                      <input type="text" className="form-control mb-3" name="" id="" aria-describedby="helpId" required onChange={(e)=>setTitle(e.target.value)}/>
                      <label >Giá</label>
                      <input type="number" className="form-control mb-3" name="" id="" aria-describedby="helpId" required onChange={(e)=>setPrice(e.target.value)}/>
                      <label >Mô tả</label>
                      <input type="text" className="form-control mb-3" name="" id="" aria-describedby="helpId" required onChange={(e)=>setDescription(e.target.value)}/>
                      <label >Ảnh</label>
                      <input type="file" className="form-control mb-3" name="" id="file" aria-describedby="helpId" required onChange={handleProductImg}/>
                      {imageError?
                        <div className="alert alert-danger " role="alert">
                            {imageError}
                        </div>:
                        <div></div>
                        }
                      <button type='submit' className='btn btn-success float-right'>Lưu lại</button>
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
    </div>
  )
}
