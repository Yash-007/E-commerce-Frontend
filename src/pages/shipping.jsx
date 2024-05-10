import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPaymentIntent } from '../api calls/orders';
import Header from '../components/header';
import { saveShippingInfo } from '../redux/cartSlice';

function Shipping() {
    const {cartItems,total} = useSelector((state)=> state.cart);
    const {user} = useSelector((state)=>state.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [shippingInfo, SetShippingInfo] = useState({
      address: "",
      city: "",
      state: "",
      country:"",
      pinCode:"",
    })

    useEffect(()=>{
    if(cartItems.length ===0)
   return navigate('/cart');
    },[cartItems])
  
    const handleChange = (e)=>{
      const {name, value} = e.target;
      SetShippingInfo({...shippingInfo, [name]: value});
    }
    
    const submitHandler=async(e)=>{
     e.preventDefault();
 
     dispatch(saveShippingInfo(shippingInfo));
     
     const res = await createPaymentIntent(total);

     if(res?.success){
      navigate("/pay", {state: res.clientSecret});
     }
     else{
      toast.error("Something went wrong");
     }
    }

  return (
  <>
    <div>
      <Header user={user}/>
        <div className="max-w-[320px] mx-auto mt-10 shadow-xl border border-stroke p-4 pb-8 rounded-md">
          <form onSubmit={submitHandler}>
            <h2 className="text-2xl tracking-wider font-[600] text-center mb-6 mt-2">SHIPPING ADDRESS</h2>
            <div className="w-full mb-4">
              <input
                required
                name="address"
                type="text"
                placeholder="Address"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                value={shippingInfo.address}
                onChange={handleChange}
              />
            </div>

            <div className="w-full mb-4">
              <input
                required
                name="city"
                type="text"
                placeholder="City"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                value={shippingInfo.city}
                onChange={handleChange}
              />
            </div>

            <div className="w-full mb-4">
              <input
                required
                name="state"
                type="text"
                placeholder="State"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                value={shippingInfo.state}
                onChange={handleChange}
              />
            </div>

            <div className="w-full mb-4">
            <select
                name="country"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                value={shippingInfo.country}
                onChange={handleChange}
              >
              <option value="">Choose Country</option>
              <option value="india">India</option>
              </select>
            </div>

            <div className="w-full mb-4">
              <input
                required
                name="pinCode"
                type="text"
                placeholder="Pin Code"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                value={shippingInfo.pinCode}
                onChange={handleChange}
              />
            </div>

            <button type='submit' className="mt-6 flex w-full justify-center rounded p-3 bg-orange-500 hover:bg-orange-600 text-white transition-all  font-medium text-gray">
              PAY NOW
            </button>
          </form>
        </div>
    </div>
  </>
  )
}

export default Shipping