import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function CartItem({
    incrementHandler,
    decrementHandler,
    removeHandler,
    cartItem
}) {
    const navigate= useNavigate();
    const {name,price,quantity,productId,photo} = cartItem;

  return (
    <div className='flex justify-between gap-10 align-middle px-5'>
    <img className='min-w-20 max-w-20 h-20' src={photo} alt="" />
     <div className='my-auto min-w-[100px] sm:w-[200px]'>
     <p onClick={()=> navigate(`/productDetail/${productId}`)} className='mb-2 hover:text-[#3f50b5] cursor-pointer' >{name}</p>
     <p>₹ {price}</p>
     </div>


     <div className='flex align-middle gap-4 my-auto'>
      <span
       onClick={()=> decrementHandler(cartItem)}
       className='px-3 py-1 rounded-md flex align-middle text-black bg-[#AAAAAA] hover:text-white hover:bg-black cursor-pointer'>
       -
      </span>

      <span className=' my-auto'>{quantity}</span>

      <span
       onClick={()=> incrementHandler(cartItem)}
       className='px-3 py-1 rounded-md flex align-middle text-black bg-[#AAAAAA] hover:text-white hover:bg-black cursor-pointer'>
       +
      </span>
     </div>

     <div className='my-auto'>
     <span><DeleteIcon onClick={()=> removeHandler(productId)} sx={{ color: 'red', cursor: 'pointer' }} /></span>
     </div>
  </div>
  )
}

export default CartItem