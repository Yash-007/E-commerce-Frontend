import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { getMyOrders } from '../api calls/orders';
import Header from '../components/header';
import { Skeletons } from '../components/loader';
import TableHOC from '../components/tableHOC';

const columns = [
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
]


function Orders() {
    const {user} = useSelector((state)=> state.users);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
     const GetMyOrders= async()=>{
        setLoading(true);
        const res= await getMyOrders(user._id)
        setLoading(false);
        if(res?.success){
          const orders = res?.orders;
          if(orders.length > 0){
            setRows(
              orders.map((order) => ({
                amount: `₹${order?.total}`,
                discount: `₹${order?.discount}`,
                quantity: order?.orderItems?.length,  
                status: <span className={(order?.status === 'Processing') ? 'text-[red]' : (order?.status === 'Shipped') ? 'text-[green]' : 'text-[blue]'}>{order?.status}</span>,
              }))
            )
          }       
      }
        else{
            toast.error(res?.response?.data?.message);
        }
     }

     GetMyOrders();
    },[]);

    const Table = TableHOC(
      columns,
      rows,
      "",
      "Orders",
      rows.length > 6,
      false
    )();

  return (
  <>
    <div>
     <Header user={user}/>
     <div className='px-6'>
     {loading ? <Skeletons length={30}/> :
     <div className='overflow-auto items'>
        {Table}
     </div>    
      }
     </div>
    </div>
  </>
  )
}

export default Orders