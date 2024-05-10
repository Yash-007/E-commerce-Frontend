import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DoughnutChart, PieChart } from '../../../components/charts';
import { Skeletons } from '../../../components/loader';
import Sidebar from '../../../components/sidebar';
import { getPieChartAsync } from '../../../redux/statSlice';
import { generateRandomNumber, getLastMonths } from '../../../utils/features';

function PieCharts() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const { loading, error, pieCharts } = useSelector((state) => state.stats);



  useEffect(() => {
    dispatch(getPieChartAsync(user._id));
  }, []);

  if (error) {
    toast.error(error?.data?.message);
  }


  const order = pieCharts?.orderFullfillment;
  const categories = pieCharts?.productCategories;
  const stock = pieCharts?.stockAvailability;
  const revenue = pieCharts?.revenueDistribution;
  const ageGroup = pieCharts?.userAgeGroups;
  const adminCustomer = pieCharts?.adminCustomer;


  const { last6Months, last12Months } = getLastMonths();

  return (
    <main className='w-full bg-slate-200 h-screen flex justify-between gap-0 md:gap-6 items-start'>
      <Sidebar />

      <section className='w-4/5 grow bg-white h-screen overflow-y-auto font-[poppins]'>

        <div className='p-5 pb-12 items-center '>
          <h1 className='w-[90%] text-3xl font-bold mt-5 mb-10 mx-auto'>Pie & Doughnut Charts</h1>
          {loading ? <Skeletons length={30}/> : 
           <>
           <div className='sm:w-[50%] lg:w-[35%] w-[100%] mx-auto flex flex-col justify-center h-[300px] sm:h-auto'>
            <PieChart
              labels={["Processing", "Shipped", "Delivered"]}
              data={[order?.processing, order?.shipped, order?.delivered]}
              backgroundColor={[
                `hsl(110,80%, 80%)`,
                `hsl(110,80%, 50%)`,
                `hsl(110,40%, 50%)`,
              ]}
              offset={[0, 0, 50]}
            />
            <h2 className='text-center mt-3 text-xl'>Order Fulfillment Ratio</h2>
          </div>

          <div className='sm:w-[50%] lg:w-[35%] w-[100%] mx-auto flex flex-col justify-center mt-24 h-[300px] sm:h-[auto]'>
            <DoughnutChart
              labels={categories?.map((i)=> Object.keys(i)[0])}
              data={categories?.map((i)=> Object.values(i)[0])}
              backgroundColor={categories?.map((i)=> `hsl(${Object.values(i)[0] * generateRandomNumber()}, ${Object.values(i)[0]}%, 50%)`)}
              legends={false}
              offset={[0,20,0, 80]}
            />
            <h2 className='text-center mt-9 text-xl'>Product Categories Ratio</h2>
          </div>


          <div className='sm:w-[50%] lg:w-[35%] w-[100%] mx-auto flex flex-col justify-center mt-14 h-[300px] sm:h-auto'>
            <DoughnutChart
              labels={["In Stock", "Out Of Stock"]}
              data={[stock?.inStock, stock?.outOfStock]}
              backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
              legends={false}
              offset={[0, 80]}
              cutout={"70%"}
            />
            <h2 className='text-center mt-3 text-xl'>Stock Availability</h2>
          </div>

          <div className='sm:w-[50%] lg:w-[35%] w-[100%] mx-auto flex flex-col justify-center mt-14 h-[300px] sm:h-auto'>
            <DoughnutChart
              labels={[
                "Marketing Cost",
                "Discount",
                "Burnt",
                "Production Cost",
                "Net Margin",
              ]}
              data={[
                revenue?.marketingCost,
                revenue?.discount,
                revenue?.burnt,
                revenue?.productionCost,
                revenue?.netMargin,
              ]}
              backgroundColor={[
                "hsl(110,80%,40%)",
                "hsl(19,80%,40%)",
                "hsl(69,80%,40%)",
                "hsl(300,80%,40%)",
                "rgb(53, 162, 255)",
              ]}
              legends={false}
              offset={[20, 30, 20, 30, 80]}
            />
            <h2 className='text-center mt-3 text-xl'>Revenue Distribution</h2>
          </div>

          <div className='sm:w-[50%] lg:w-[35%] w-[100%] mx-auto flex flex-col justify-center mt-14 h-[300px] sm:h-auto'>
            <PieChart
              labels={[
                "Teenager(Below 20)",
                "Adult (20-40)",
                "Older (above 40)",
              ]}
              data={[ageGroup?.teen, ageGroup?.adult, ageGroup?.old]}
              backgroundColor={[
                `hsl(10, ${80}%, 80%)`,
                `hsl(10, ${80}%, 50%)`,
                `hsl(10, ${40}%, 50%)`,
              ]}
              offset={[0, 0, 50]}
            />
            <h2 className='text-center mt-3 text-xl'>Users Age Groups</h2>
          </div>

          <div className='sm:w-[50%] lg:w-[35%] w-[100%] mx-auto flex flex-col justify-center mt-14 h-[300px] sm:h-auto'>
            <DoughnutChart
              labels={["Admin", "Customers"]}
              data={[adminCustomer?.admin, adminCustomer?.customer]}
              backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
              offset={[0, 80]}
            />
            <h2 className='text-center mt-3 text-xl'>Admin Customer Ratio</h2>
          </div>
           </>
          }
        </div>
      </section>
    </main>
  )
}

export default PieCharts