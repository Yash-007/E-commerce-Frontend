import { Rating } from '@mui/material';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleProduct } from '../api calls/products';
import Header from '../components/header';
import { Skeletons } from '../components/loader';
import { addToCart } from '../redux/cartSlice';

function ProductDetail() {
    const {user} = useSelector((state)=> state.users);
    const params = useParams();
    const [product, setProduct] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
 
    const addToCartHandler=(cartItem)=>{
      if(cartItem.stock < 1) return toast.error("Out of Stock");
  
      dispatch(addToCart(cartItem))
      toast.success("Added to Cart");
    }

    useEffect(()=>{
     const GetSingleProduct = async()=>{
      const res = await getSingleProduct(params.id);
      if(res?.success){
        setProduct(res?.product);
      }
      else{
       return navigate("/404");
      }
     }

     GetSingleProduct();
    },[])
  return (  
    <>
         <Header user={user}/>
         {!product ? <Skeletons length={30}/> : 
          <>
        <div className='flex flex-wrap gap-3 mt-8 font-[poppins]'>
            <div className='flex align-middle mx-auto'>
             <img className='h-[250px] w-[400px] lg:h-[500px] lg:w-[500px] my-auto' src={`${import.meta.env.VITE_SERVER_IMG}/${product?.photo}`} alt="" />
            </div>

            <div className='flex-1 p-8'>
             <h1 className='text-2xl font-bold'>{product?.name}</h1>
             <p className='text-[gray] text-md'>{product?.category}</p>
             <Rating className='mt-2' name="read-only" size='small' value={4} readOnly />
             <p className='mt-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus libero enim praesentium optio aperiam repellendus natus laboriosam pariatur, voluptatum sunt. </p>
             <p className='text-orange-500 mt-3 font-bold text-xl'>₹ {product?.price}</p>

        <button 
        onClick={()=> addToCartHandler({productId:product?._id, price:product?.price, name:product?.name, photo:`${import.meta.env.VITE_SERVER_IMG}/${product?.photo}`, stock:product?.stock, quantity:1})} 
        className="mt-6 flex w-[200px] justify-center rounded p-3 bg-orange-500 hover:bg-orange-600 font-medium text-white tracking-wider">
          Add To Cart
        </button>

            </div>
        </div>
          </>
         }
    </>
  )
}

export default ProductDetail