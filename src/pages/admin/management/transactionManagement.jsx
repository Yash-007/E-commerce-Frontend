import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteOrder, getSingleOrder, processOrder } from '../../../api calls/orders';
import Header from '../../../components/header';
import { Skeletons } from '../../../components/loader';
import Sidebar from '../../../components/sidebar';

const defaultData = {
  shippingInfo: {
    address: '',
    city: '',
    state: '',
    country: '',
    pinCode: '',
  },
  status: '',
  subtotal: 0,
  discount: 0,
  shippingCharges: 0,
  tax: 0,
  total: 0,
  orderItems: [],
  customer: { name: '', _id: '' },
  _id: '',
};

function TransactionManagement() {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const [data, setData] = useState([]);

  const {
    shippingInfo: { address, city, state, country, pinCode },
    orderItems,
    customer,
    status,
    tax,
    subtotal,
    total,
    discount,
    shippingCharges,
  } = data?.order || defaultData;

  useEffect(() => {
    const GetSingleOrder = async () => {
      const res = await getSingleOrder(params.id);
      if (res?.success)
        setData(res);
      else
        return navigate("/404")
    }

    GetSingleOrder();
  }, []);


  const updateHandler = async () => {
    const res = await processOrder(data?.order?._id, user._id)
    if (res?.success) {
      toast.success(res.message);
      return navigate('/admin/transactions')
    }
    else {
      toast.error(res?.response?.data?.message);
    }
  }

  const deleteHandler = async () => {
    const res = await deleteOrder(data?.order?._id, user._id)
    if (res?.success) {
      toast.success(res?.message);
      return navigate('/admin/transactions')
    }
    else
      toast.error(res?.response?.data?.message);
  }

  return (
    <main className='w-full bg-slate-100 h-screen flex justify-between gap-0 md:gap-6 items-start'>
      <Sidebar />

      <section className='w-4/5 grow bg-white h-screen overflow-y-auto font-[poppins]'>
        <Header user={user} />
        
       {orderItems.length === 0 ?  
        <Skeletons length={30}/> : 
        <div className='flex md:flex-row flex-col justify-around gap-2 p-4 pb-16'>
          <div className="w-full sm:w-[320px] mx-auto mt-10 shadow-xl border border-stroke p-6 pb-8 rounded-md">
            <div className='flex justify-between'>
              <h3 className='text-xl sm:text-2xl font-[300]'>ORDER ITEMS</h3>
              <span><DeleteIcon onClick={() => deleteHandler()} sx={{ color: 'red', cursor: 'pointer' }} /></span>
            </div>
            <div className='mt-5'>
              {orderItems && orderItems.map((item) => (
                <div className='flex justify-between align-middle my-auto gap-5'>
                  <img className='sm:h-10 sm:w-16 h-5 w-8' src={item.photo} alt="abh" />
                  <span className='text-sm my-auto'>{item?.name}</span>
                  <span className='text-sm my-auto'>{item?.price} X {item?.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full sm:w-[320px] mx-auto mt-10 shadow-xl border border-stroke p-6 pb-8 rounded-md text-sm">
            <h3 className='text-xl sm:text-2xl font-[300]'>ORDER INFO</h3>

            <div className='mt-5'>
              <h3 className='font-bold'>User Info</h3>
              <p className='my-2'>Name: {customer?.name}</p>
              <p className='my-2'>Address: {address}</p>
            </div>

            <div className='mt-5'>
              <h3 className='font-bold'>Amount Info</h3>
              <p className='my-2'>Subtotal: {subtotal}</p>
              <p className='my-2'>Shipping Charges: {shippingCharges}</p>
              <p className='my-2'>Tax: {tax}</p>
              <p className='my-2'>Discount: {discount}</p>
              <p className='my-2'>Total: {total}</p>
            </div>

            <div className='mt-5'>
              <h3 className='font-bold'>Status Info</h3>
              <p className='my-2'>Status:  <span className={(status === 'Processing') ? 'text-[red]' : (status === 'Shipped') ? 'text-[green]' : 'text-[blue]'}>{status}</span></p>
            </div>

            <button onClick={() => updateHandler()} className="mt-6 flex w-full justify-center rounded p-3 bg-[#387ADF] hover:bg-[blue] text-white transition-all  font-medium text-gray">
              Process
            </button>
          </div>
        </div>
       } 
      </section>
    </main>
  )
}

export default TransactionManagement