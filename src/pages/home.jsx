import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import { Skeletons } from '../components/loader';
import ProductCard from '../components/productCard';
import { addToCart } from '../redux/cartSlice';
import { getLatestProductsAsync } from '../redux/productSlice';

function Home() {
  const navigate= useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state)=> state.users);
  const {cartItems} = useSelector((state)=> state.cart);
  const {latestProducts, error, loading} = useSelector((state)=> state.products);

  useEffect(()=>{
    dispatch(getLatestProductsAsync());
  },[]);

  const addToCartHandler=(cartItem)=>{
    if(cartItem.stock < 1) return toast.error("Out of Stock");

    dispatch(addToCart(cartItem))
    toast.success("Added to Cart");
  }

  
  if(error){
    toast.error("Cannot fetch the Products");
  }

  return (
    <>
      <div>
        <Header user={user} />
      <div className='w-[90%] mx-auto pb-8'>
      <img className='h-[240px] sm:h-[350px] w-full mx-auto mt-8' src="https://www-cdn.bigcommerce.com/assets/Ecommerce-CRO-Header.png" alt="" />

      <h1 className='text-3xl mx-auto mb-2 mt-10 text-center sm:text-left font-[300] tracking-wider'>LATEST PRODUCTS</h1>
       
      {
        loading ? <Skeletons length={16}/> :
        <>
          <div className='flex flex-wrap justify-around gap-10 mb-10 mt-10'>
       {latestProducts.length>0 && latestProducts.map((prod)=>(
          <ProductCard
            productId={prod._id}
            name={prod.name}
            price={prod.price}
            stock={prod.stock}
            photo={`${import.meta.env.VITE_SERVER_IMG}/${prod.photo}`}
            handler={addToCartHandler}
          />
         ))} 
          </div>
       </>
      }
      <div className='flex justify-center'>
          <Button onClick={()=>navigate("/search")} variant='text' color='primary' size='large' className='mx-auto text-2xl'>Show More </Button>
      </div>
      </div>
      </div>
    </>
  )
}

export default Home