import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCard({
    productId,
    price,
    name,
    photo,
    stock,
    handler
}) {
  const navigate = useNavigate();
  const [showButton, setShowButton]= useState(false);
  return (
<div className='p-6 w-[300px] min-h-[350px] border border-stroke rounded-md font-[poppins] hover:text-white relative'
     style={{transition: 'background-color 0.3s, opacity 0.3s'}}
     onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = '#0000006b'; setShowButton(true) }}
     onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = 'transparent'; setShowButton(false)}}
>
    <img src={photo} alt=""  className={(showButton ? 'opacity-70 ': 'opacity-100 ' ) + 'h-[150px] mx-auto'}/>
    <hr className='w-[80%] mx-auto mt-10' />
    <div className='mt-10 text-center'>
        <span onClick={()=> navigate(`/productDetail/${productId}`)} className='my-1 hover:text-[#3f50b5] cursor-pointer'>{name}</span>
        <p className='mt-1 font-[600] text-[rgb(255,166,0)]'>₹ {price}</p>
        {showButton && (
              <button 
              className="absolute bottom-24 left-0 right-0 w-1/2 mx-auto transition duration-300 opacity-100 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
              onClick={()=> handler({productId,price,name,photo,stock,quantity:1})} 
              >
                Add to Cart
              </button>
          )}
    </div>
</div>
  )
}

export default ProductCard;