import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCoupon, getAllCoupons } from '../../api calls/coupons';
import Header from '../../components/header';
import { Skeletons } from '../../components/loader';
import Sidebar from '../../components/sidebar';
import TableHOC from '../../components/tableHOC';

const columns = [
  {
    Header: "Code",
    accessor: "code"
  },
  {
    Header: "Amount",
    accessor: "amount"
  },
  {
    Header: "Date",
    accessor: "date"
  },
  {
    Header: "Action",
    accessor: "action"
  },
];


function Coupons() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const GetAllCoupons = async()=>{
      setLoading(true);
      const response = await getAllCoupons(user._id);
      setLoading(false);
     if(response.success){
      setRows(response.coupons.map((coupon)=>{
        let date;
        if(coupon?.createdAt)
        date = new Date(coupon?.createdAt);
        else 
        date = new Date();

        const day= date.getDate();
        const month= date.getMonth()+1;
        const year= date.getFullYear();
        date= `${day}/${month}/${year}`
        return ({
        code: <div className='font-bold tracking-wider'>{coupon.code}</div>,
        amount: coupon.amount,
        date,
        action: <span onClick={() => deleteHandler(coupon._id)}><DeleteIcon sx={{ color: 'red', cursor: 'pointer' }} /></span>,
      })
     }
    ));
     }
     else {
      toast.error(response?.response?.data?.message);
    }
  }
    GetAllCoupons();
  }, [refresh]);



  const Table = TableHOC(
    columns,
    rows,
    "",
    "Coupons",
    rows.length > 6,
    true,
    "/admin/coupons/new"
  )();


  const deleteHandler = async (id) => {
    const response = await deleteCoupon(id, user?._id);
    if (response?.success) {
      setRefresh(refresh+1);
      toast.success(response.message);
    }
    else {
      toast.error(response?.response?.data?.message);
    }
  }

  return (
    <main className='w-full bg-slate-100 h-screen flex justify-between gap-0 md:gap-6 items-start'>
      <Sidebar />

      <section className='w-4/5 grow bg-white h-screen overflow-y-auto font-[poppins] '>
        <Header user={user} />

        <div className='p-4 pb-16'>
        {loading ? <Skeletons length={30}/> :
         <div className='overflow-auto items'>
         {Table}
         </div>
         }
        </div>
      </section>
    </main>
  )
}

export default Coupons