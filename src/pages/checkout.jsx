import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { newOrder } from '../api calls/orders';
import { resetCart } from '../redux/cartSlice';
 
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckOutForm=()=>{
const stripe = useStripe();
const elements= useElements();
const navigate = useNavigate();
const dispatch = useDispatch();

const {user} = useSelector((state)=>state.users);
const {
    shippingInfo,
    cartItems,
    subtotal,
    tax,
    discount,
    shippingCharges,
    total,
}   = useSelector((state)=> state.cart);

 const [isProcessing, setIsProcessing] = useState(false);

 const submitHandler=async(e)=>{
    e.preventDefault();

    if(!stripe || !elements) return;
    setIsProcessing(true);

    const OrderData = {
        shippingInfo,
        orderItems: cartItems,
        subtotal,
        tax,
        discount,
        shippingCharges,
        total,
        user: user?._id,
    }

   const {paymentIntent, error}= await stripe.confirmPayment({
        elements,
        confirmParams:{return_url: window.location.origin},
        redirect: "if_required",
    });

    if(error){
        setIsProcessing(false);
        return toast.error(error.message || "Something went wrong");
    } 

    if(paymentIntent.status=== "succeeded"){
     const res= await newOrder(OrderData);
     if(res?.success){
        toast.success("Order placed successfully");
        dispatch(resetCart());
        navigate("/orders");
     }
     else{
        toast.error(res?.response?.data?.message);
     }
    }
    
    setIsProcessing(false);
 };
 


    return (
        <>
            <div className='max-w-[280px] mx-auto mt-12'>
                <form onSubmit={submitHandler}>
                    <PaymentElement/>
                    <button type='submit' disabled={isProcessing} className="mt-6 flex w-full justify-center rounded p-2 bg-[#074173] text-white transition-all  font-medium text-gray">
                     {isProcessing ? "Processing...": "Pay"}
                    </button>
                    {/* <button disabled={isProcessing}  type='submit'>{isProcessing ? "Processing...": "Pay"}</button> */}
                </form>
            </div>
        </>
    )
}

function Checkout() {
   
    const location = useLocation();
    const clientSecret= location.state;

    if(!clientSecret) return <Navigate to={"/shipping"} />

  return (
  <Elements
   options={{
    clientSecret,
   }}
   stripe={stripePromise}>
   <CheckOutForm/>
  </Elements>
  )
}

export default Checkout