import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import {storage,fs} from '../Config/Config'
import { useNavigate } from 'react-router-dom';
export const FormEdit = () => {
    let navigate  = useNavigate();
    const location = useLocation()
    const productEdit=location.state
    const [title,setTitle]=useState(productEdit.title)
    const [price,setPrice]=useState(productEdit.price)
    const [description,setDescription]=useState(productEdit.description)
    
    const [image,setImage]=useState()
    const [imageError,setImageError]=useState()

    const [errorMsg,setErrorMsg]=useState()

    const [user,setUser]=useState(null);

    // console.log(productEdit);
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


    const deleteFromFirebase = (url) => {
        //1.
        let pictureRef = storage.refFromURL(url);
       //2.
        pictureRef.delete()
          .then(() => {
            //3.
            // alert("Picture is deleted successfully!");
          })
          .catch((err) => {
            console.log(err);
          });
      };
    let editData=productEdit
    const handleEditProducts = (e)=>{
        e.preventDefault()

        editData.title = title
        editData.price = price
        editData.description = description
        
        
        if(image!=null){
            const uploadTask=storage.ref(`product-images/${image.name}`).put(image);
                uploadTask.on('state_changed',snapshot=>{
                  const  progress =Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100) 
                    // console.log(progress);
                },error=>setErrorMsg(error.message),()=>{
                    storage.ref('product-images').child(image.name).getDownloadURL().then(url=>{
                        
                        deleteFromFirebase(productEdit.url)
                        editData.url=url
                        fs.collection('Products').doc(productEdit.ID).update(editData).then(()=>{
                            setTimeout(() => {
                                navigate('/editProducts');
                            }, 1000);
                        })


                        // deleteFromFirebase(productEdit.url)
                })
            })
            
        }
        else {
            editData.url = productEdit.url
            fs.collection('Products').doc(productEdit.ID).update(editData).then(()=>{
                console.log(editData);
                setTimeout(() => {
                  navigate('/editProducts');
              }, 1000);
            })
        }
        // editData.url = urlImage
        // // if(urlImage!==null){
            
        // // }
        
        // console.log( editData.url);
        
    }
    
    return (
        <div className="container">
            <h4 className="text-center mt-3 mb-4">Sửa sản phẩm</h4>
            <div className="row">
                <div className="col-2"></div>
                <form className="form-group col-8 mt-3 card px-1 py-1" onSubmit={handleEditProducts}>
                    <label >Tên sản phẩm</label>
                    <input type="text" className="form-control mb-3" name="" id="" aria-describedby="helpId" required onChange={(e)=>setTitle(e.target.value)} defaultValue={productEdit.title}/>
                    <label >Giá</label>
                    <input type="number" className="form-control mb-3" name="" id="" aria-describedby="helpId" required onChange={(e)=>setPrice(e.target.value)} defaultValue={productEdit.price}/>
                    <label >Mô tả</label>
                    <input type="text" className="form-control mb-3" name="" id="" aria-describedby="helpId" required onChange={(e)=>setDescription(e.target.value)} defaultValue={productEdit.description}/>
                    <label >Ảnh</label>
                    <input type="file" className="form-control mb-3" name="" id="file" aria-describedby="helpId" onChange={handleProductImg}/>
                    {imageError?
                    <div className="alert alert-danger " role="alert">
                        {imageError}
                    </div>:
                    <div></div>
                    }
                    {image?
                        <img src={URL.createObjectURL(image)} alt="dt" className='mb-2 ml-2' style={{width:"220px", height:"180px"}}/>
                        :
                        <img src={productEdit.url} alt="dt" className='img-fluid mb-2 ml-2' style={{width:"200px", height:"180px"}}/>
                    }
                    <button type='submit' className='btn btn-success float-right'>Lưu lại</button>
                </form>
            </div>
        </div>
        
    )
}
