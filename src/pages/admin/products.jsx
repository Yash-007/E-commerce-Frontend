import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import { Skeletons } from '../../components/loader';
import Sidebar from '../../components/sidebar';
import TableHOC from '../../components/tableHOC';
import { getAdminProductsAsync } from '../../redux/productSlice';

const columns = [
  {
    Header: "Photo",
    accessor: "photo"
  },
  {
    Header: "Name",
    accessor: "name"
  },
  {
    Header: "Price",
    accessor: "price"
  },
  {
    Header: "Stock",
    accessor: "stock"
  },
  {
    Header: "Action",
    accessor: "action"
  },
];


function Products() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const { adminProducts, error, loading } = useSelector((state) => state.products);
  const [rows, setRows] = useState([]);

  if (error) {
    toast.error(error?.data?.message);
  }

  const Table = TableHOC(
    columns,
    rows,
    "",
    "Products",
    rows.length > 6,
    true,
    "/admin/products/new"
  )();

  useEffect(() => {
    dispatch(getAdminProductsAsync(user?._id));
  }, []);

  useEffect(() => {
    if (adminProducts.length > 0) {
      setRows(
        adminProducts.map((prod) => ({
          photo: <img className='w-12 h-12' src={`${import.meta.env.VITE_SERVER_IMG}/${prod?.photo}`} alt="" />,
          name: prod?.name,
          price: prod?.price,
          stock: prod?.stock,
          action: <Link className='text-[blue] bg-[#5BBCFF] rounded-lg p-1 px-2' to={`/admin/products/${prod?._id}`}>Manage</Link>
        }))
      )
    }
  }, [adminProducts]);

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

export default Products