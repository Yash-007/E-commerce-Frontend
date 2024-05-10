import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart } from '../../../components/charts';
import { Skeletons } from '../../../components/loader';
import Sidebar from '../../../components/sidebar';
import { getBarChartAsync } from '../../../redux/statSlice';
import { getLastMonths } from '../../../utils/features';


function BarCharts() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const { loading, error, barCharts } = useSelector((state) => state.stats);

  useEffect(() => {
    dispatch(getBarChartAsync(user._id));
  }, []);

  if (error) {
    toast.error(error?.data?.message);
  }

  const products = barCharts?.product || [];
  const orders = barCharts?.order || [];
  const users = barCharts?.users || [];

  const { last6Months, last12Months } = getLastMonths();

  return (
    <>
      <main className='w-full bg-slate-200 h-screen flex justify-between gap-0 md:gap-6 items-start'>
        <Sidebar />

        <section className='w-4/5 grow bg-white h-screen overflow-y-auto font-[poppins]'>


          <div className='p-5 pb-12 items-center '>
            <h1 className='w-[90%] text-3xl font-bold mt-5 mb-10 mx-auto'> Bar Charts</h1>

            {loading ? <Skeletons length={30}/> : 
             <>
             <div className='sm:w-[80%] w-[100%] mx-auto flex flex-col justify-center'>
              <BarChart
                data1={products}
                data2={users}
                labels={last6Months}
                title_1="Products"
                title_2="Users"
                bgColor_1={`hsl(260,50%,30%)`}
                bgColor_2={`hsl(360,90%,90%)`}
              />
              <h2 className='text-center mt-5 text-xl'>Top Selling Products & Top Customers</h2>
            </div>

            <div className='sm:w-[80%] h-[300px] sm:h-[100%] w-[100%] mx-auto flex flex-col justify-center mt-12'>
              <BarChart
                horizontal={true}
                data1={orders}
                data2={[]}
                title_1="Products"
                title_2=""
                bgColor_1={`hsl(180, 40%, 50%)`}
                bgColor_2=""
                labels={last12Months}
              />
              <h2 className='text-center mt-5 text-xl'>Orders throughout the year</h2>
            </div>
             </>
             }
          </div>
        </section>
      </main>
    </>
  )
}

export default BarCharts