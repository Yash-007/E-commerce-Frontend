import React, { useEffect } from 'react'
import Header from '../../../components/header';
import Sidebar from '../../../components/sidebar';
import { LineChart } from '../../../components/charts'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getLineChartAsync } from '../../../redux/statSlice';
import { getLastMonths } from '../../../utils/features';
import { Skeletons } from '../../../components/loader';

function LineCharts() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const { loading, error, lineCharts } = useSelector((state) => state.stats);

  useEffect(() => {
    dispatch(getLineChartAsync(user._id));
  }, []);

  if (error) {
    toast.error(error?.data?.message);
  }

  const users = lineCharts?.users;
  const product = lineCharts?.product;
  const revenue = lineCharts?.revenue;
  const discount = lineCharts?.discount;


  const { last12Months } = getLastMonths();

  return (
    <main className='w-full bg-slate-200 h-screen flex justify-between gap-0 md:gap-6 items-start'>
      <Sidebar />

      <section className='w-4/5 grow bg-white h-screen overflow-y-auto font-[poppins]'>

        <div className='p-5 pb-12 items-center '>
          <h1 className='w-[90%] text-3xl font-bold mt-5 mb-10 mx-auto'> Line Charts</h1>
          {loading ? <Skeletons length={30}/> : 
          <>
          <div className='sm:w-[80%] w-[100%] h-[200px] sm:h-auto mx-auto flex flex-col justify-center mt-4'>
            <LineChart
              data={users}
              label="Users"
              borderColor="rgb(53, 162, 255)"
              backgroundColor="rgba(53, 162, 255,0.5)"
              labels={last12Months}
            />

            <h2 className='text-center mt-5 text-xl'>Active Users</h2>
          </div>

          <div className='sm:w-[80%] w-[100%] h-[200px] sm:h-auto mx-auto flex flex-col justify-center mt-16'>
            <LineChart
              data={product}
              backgroundColor={"hsla(269,80%,40%,0.4)"}
              borderColor={"hsl(269,80%,40%)"}
              label="Products"
              labels={last12Months}
            />
            <h2 className='text-center mt-5 text-xl'>Total Products (SKU)</h2>
          </div>

          <div className='sm:w-[80%] w-[100%] h-[200px] sm:h-auto mx-auto flex flex-col justify-center mt-16'>
            <LineChart
              data={revenue}
              backgroundColor={"hsla(129,80%,40%,0.4)"}
              borderColor={"hsl(129,80%,40%)"}
              label="Revenue"
              labels={last12Months}
            />
            <h2 className='text-center mt-5 text-xl'>Total Revenue</h2>
          </div>

          <div className='sm:w-[80%] w-[100%] h-[200px] sm:h-auto mx-auto flex flex-col justify-center mt-16'>
            <LineChart
              data={discount}
              backgroundColor={"hsla(29,80%,40%,0.4)"}
              borderColor={"hsl(29,80%,40%)"}
              label="Discount"
              labels={last12Months}
            />
            <h2 className='text-center mt-5 text-xl'>Discount Allotted</h2>
          </div>
          </>
          }

        </div>
      </section>
    </main>)
}

export default LineCharts