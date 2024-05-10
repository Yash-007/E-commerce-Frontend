import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/cartItem';
import Header from '../components/header';
import { addToCart, calculatePrice, discountApplied, removeCartItem } from '../redux/cartSlice';


function Cart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {cartItems,total,subtotal,tax,shippingCharges,discount} = useSelector((state)=> state.cart);
    const {user} = useSelector((state)=> state.users);
    const [couponCode, setCouponCode] = useState('');
    const [isVilidCouponCode, setIsValidCouponCode] = useState(false);


    useEffect(()=>{
      const {token, cancel} = axios.CancelToken.source();
     const timeOutId= setTimeout(()=>{
      axios
      .get(`${import.meta.env.VITE_SERVER}/payment/discount?code=${couponCode}`,
       {cancelToken:token}
      )
      .then((res) => {
        if(cartItems.length>0)
        dispatch(discountApplied(res.data.amount));
        setIsValidCouponCode(true);
        dispatch(calculatePrice());
      })
      .catch(() => {
        dispatch(discountApplied(0));
        setIsValidCouponCode(false);
        dispatch(calculatePrice());
      });
  }, 1000);

    return ()=>{
      clearInterval(timeOutId);
      setIsValidCouponCode(false);
      cancel();
    }
    },[couponCode]);


    useEffect(()=>{
      if(cartItems.length ===0) 
      dispatch(discountApplied(0));

      dispatch(calculatePrice())
    },[cartItems])



    const incrementHandler=(cartItem)=>{
        if(cartItem.quantity >=cartItem.stock) return;

        dispatch(addToCart({...cartItem, quantity:cartItem.quantity+1}));
    }

    const decrementHandler=(cartItem)=>{
        if(cartItem.quantity <=1) return;
        
        dispatch(addToCart({...cartItem, quantity:cartItem.quantity-1}));
    }

    const removeHandler=(productId)=>{
        dispatch(removeCartItem(productId));
    }

  return (
    <>
   <div>
   <Header user={user}/>
    <div className='px-7 sm:px-14 py-6 flex flex-wrap justify-center gap-10 font-[poppins] mt-4'>
      <div className='flex-1 w-full h-auto lg:max-h-[500px] overflow-auto items'>
      {cartItems.length === 0 &&  <h1 className='text-3xl mb-2 text-center sm:text-left font-[300] tracking-wider'>NO ITEMS ADDED</h1>}
  
       <div className='flex flex-col gap-8 overflow-auto px-4'>
        {cartItems.length>0 && cartItems.map((item)=>(
          <CartItem
            cartItem={item}
            incrementHandler={incrementHandler}
            decrementHandler={decrementHandler}
            removeHandler={removeHandler}
          />
        ))}
       </div>

      </div>

      <div className='py-8 px-0 sm:py-16 sm:px-8 w-full lg:w-[300px] text-md'>
       <p className='mb-4'>Subtotal:   <span className='ml-2'>₹{subtotal}</span></p>
       <p className='mb-4'>Tax:  <span className='ml-2'> ₹{tax}</span></p>
       <p className='mb-4'>Shipping Charges: <span className='ml-2'> ₹{shippingCharges}</span></p>
       <p className='mb-4'>Discount: <span className='ml-2'> ₹{discount}</span></p>
       <p className='mb-4'>Total: <span className='ml-2'> ₹{total}</span></p>
       
       <input
        name="name"
        type="text"
        placeholder="Coupon Code"
        onChange={(e)=>setCouponCode(e.target.value)}
        className="mt-8 w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
        /> 
       {(cartItems.length>0 && couponCode) && ( discount ? <p className='text-sm text-[green] text-center mt-2'>Coupon Applied</p> : <p className='text-sm text-[red] text-center mt-2'>Invalid Coupon</p>)}

      {cartItems.length>0 &&  <button onClick={()=>navigate("/shipping")} className="mt-6 flex w-full justify-center rounded p-3 bg-orange-500 hover:bg-orange-600 font-medium text-white tracking-wider">
          CHECKOUT
       </button> }
      </div>
    </div>
   </div>

    {/* <div>
    {cartItems.length>0 && cartItems.map((c,idx)=>(
        <>
       <CartItemCard
        incrementHandler={incrementHandler}
        decrementHandler={decrementHandler}
        removeHandler={removeHandler}
        cartItem={c}
        key={idx}
       />
        </>
    )) }
    </div>
   
   <div>
    <input type="text" value={couponCode} onChange={(e)=>setCouponCode(e.target.value)}/>
   </div>

     <div>
   subtotal:{subtotal}
   tax:{tax}
   shippingCharges:{shippingCharges}
   discount: {discount}
   total: {total}
     </div>


     <h1>
      {cartItems.length>0 && <Link to='/shipping'> Checkout</Link>}
     </h1> */}
    </>
  )
}

export default Cart