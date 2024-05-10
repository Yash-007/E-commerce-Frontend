import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllOrders } from '../../api calls/orders';
import Header from '../../components/header';
import { Skeletons } from '../../components/loader';
import Sidebar from '../../components/sidebar';
import TableHOC from '../../components/tableHOC';

const columns = [
  {
    Header: "Name",
    accessor: "name"
  },
  {
    Header: "Amount",
    accessor: "amount"
  },
  {
    Header: "Discount",
    accessor: "discount"
  },
  {
    Header: "Quantity",
    accessor: "quantity"
  },
  {
    Header: "Status",
    accessor: "status"
  },
  {
    Header: "Action",
    accessor: "action"
  },
];


function Transactions() {
  const { user } = useSelector((state) => state.users);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const GetAllOrders = async () => {
      setLoading(true);
      const res = await getAllOrders(user._id)
      setLoading(false);
      if (res?.success) {
        const orders = res?.orders;
        if (orders.length > 0) {
          setRows(
            orders.map((order) => ({
              name: order?.user?.name,
              amount: order?.total,
              discount: order?.discount,
              quantity: order?.orderItems?.length,
              status: <span className={(order?.status === 'Processing') ? 'text-[red]' : (order?.status === 'Shipped') ? 'text-[green]' : 'text-[blue]'}>{order?.status}</span>,
              action: <Link className='text-[blue] bg-[#5BBCFF] rounded-lg p-1 px-2' to={`/admin/transactions/${order?._id}`}>Manage</Link>
            }))
          )
        }
      }
      else {
        toast.error(res?.response?.data?.message);
      }
    }

    GetAllOrders();
  }, []);

  const Table = TableHOC(
    columns,
    rows,
    "",
    "Transactions",
    rows.length > 6,
    false
  )();


  return (
    <main className='w-full bg-slate-100 h-screen flex justify-between gap-0 md:gap-6 items-start'>
      <Sidebar />
      <section className='w-4/5 grow bg-white h-screen overflow-y-auto font-[poppins] '>
        <Header user={user} />

        <div className='mx-auto p-4 pb-16'>
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

export default Transactions