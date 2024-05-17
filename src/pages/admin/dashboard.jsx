import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WcIcon from '@mui/icons-material/Wc';
import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import '../../App.css';
import { BarChart, DoughnutChart } from '../../components/charts';
import Header from '../../components/header';
import { Skeletons } from '../../components/loader';
import Sidebar from '../../components/sidebar';
import TableHOC from '../../components/tableHOC';
import { getStatsAsync } from '../../redux/statSlice';
import { generateColor, getLastMonths } from '../../utils/features';


const columns = [
  {
    Header: "ID",
    accessor: "_id"
  },
  {
    Header: "Discount",
    accessor: "discount"
  },
  {
    Header: "Amount",
    accessor: "amount"
  },
  {
    Header: "Quantity",
    accessor: "quantity"
  },
  {
    Header: "Status",
    accessor: "status"
  },
];


const Dashboard = () => {
  const {user} = useSelector((state)=>state.users);
  const {stats, error, loading} = useSelector((state)=> state.stats)
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();
  const {last6Months} = getLastMonths();
if(error){
  return <Navigate to={"/"}/>
}


  useEffect(()=>{
    dispatch(getStatsAsync(user?._id)); 
  },[])

  useEffect(()=>{
    if(stats?.latestTransactions)
      setRows(stats?.latestTransactions);
  },[stats]);

  const Table = TableHOC(
    columns,
     rows,
     "",
    "Top Transactions",
    false,
    false,
   )();

  return (
   <>
     <main className='w-full bg-slate-100 h-screen flex justify-between gap-0 md:gap-6 items-start'>
      <Sidebar />

      <section className='w-4/5 grow bg-white h-screen overflow-y-auto font-[poppins] '>
        <Header user={user} />

        <div className='p-4 pb-16'>
      {loading ? <Skeletons length={30}/> : 
         <div>
        <div className='flex flex-wrap justify-around xl:justify-between gap-8 mt-8'>
       <WidgetItem
          percent={stats?.percentageChange?.revenue}
          amount={true}
          value={(stats?.count?.revenue > 10000)? "10000+" : stats?.count?.revenue}
          heading={"Revenue"}
          color='rgb(0,115,255)'
        />
        
        <WidgetItem
          percent={stats?.percentageChange?.user}
          value={stats?.count?.user}
          heading={"Users"}
          color='rgb(0 198 202)'
        />

        <WidgetItem
          percent={stats?.percentageChange?.order}
          value={stats?.count?.order}
          heading={"Transactions"}
          color='rgb(255 196 0)'
        />

        <WidgetItem
          percent={stats?.percentageChange?.product}
          value={stats?.percentageChange?.product}
          heading={"Products"}
          color='rgb(76 0 255)'
        />
       </div>
       
       <div className='flex flex-col xl:flex-row justify-between gap-5 mt-10'>
         <div className='w-full shadow-all p-4 rounded-lg'>
         <h2 className='text-center mt-5 mb-5 text-2xl font-[300] tracking-wider text-[#6d6b6b]'>REVENUE AND TRANSACTIONS</h2>
         <BarChart
              labels={last6Months}
              data1={stats?.chart?.revenue}
              data2={stats?.chart?.order}
              title_1="Revenue"
              title_2="Transaction"
              bgColor_1="rgb(0,115,255)"
              bgColor_2="rgba(53,162,235,0.8)"
            />
         </div>

         <div className='p-4 xl:w-[430px] shadow-all rounded-lg flex flex-col justify-center align-middle'>
            <h1 className='text-center mt-5 text-2xl font-[300] tracking-wider text-[#6d6b6b] mb-8'>INVENTORY</h1>

       {stats?.categoryCount && stats?.categoryCount.length>0 && stats?.categoryCount.map((category)=>{
        const [heading, value]  = Object.entries(category)[0];
        return (
         <ProgressBar
          key={heading}
          heading={heading}
          percent={value}
          // color={`hsl(${value * 4 * generateRandomNumber()}, ${value}%, 30%)`}
          color={`${generateColor(heading)}`}
         />
        );
       })}
         </div>

       </div>

       
       <div className='flex flex-col lg:flex-row gap-6 mt-10'>
         <div className='w-[220px] sm:w-[300px] py-4 rounded-lg relative shadow-all mx-auto'>
         <h1 className='text-center mt-5 text-2xl font-[300] tracking-wider text-[#6d6b6b] mb-8'> GENDER RATIO</h1>
         <DoughnutChart
              labels={["Male", "Female"]}
              data={[stats?.userRatio?.male, stats?.userRatio?.female]}
              backgroundColor={["hsl(340,82%,56%)", "rgba(53,162,235,0.8)"]}
              cutout={90}
            />
            <p className='absolute bottom-[180px] left-[135px]'>
              <WcIcon fontSize='large'/>
            </p>
         </div>

         <div className='grow p-4 py-1 rounded-lg shadow-all overflow-auto items'>
          {Table}
         </div>

       </div>
        </div>
      }
      </div>
     </section>
    </main>
   </>
  );
};

const WidgetItem = ({
  heading,
  value,
  percent,
  color,
  amount= false
}) =>{
  return  (
  <div className='py-8 px-5 w-[220px] sm:w-[250px] shadow-all rounded-lg'>
    <div className='flex justify-between gap-6'>
      <div className=''>
       <p className='text-sm text-[#919090] mb-1'>{heading}</p>
       <h4 className='text-xl font-bold mb-1'>{amount ? `$${value}` : value}</h4>
       {percent > 0 ? 
        <span className='text-[#3fc43f]'>
           <TrendingUpIcon/> <span>+{percent}%</span>
        </span>
        :
        <span className='text-[red]'>
           <TrendingDownIcon/> <span>{percent}%</span>
        </span>
     }
      </div>

<div className='w-[80px]'>
  <CircularProgressbar value={Math.abs(percent)} text={`${percent}%`} 
  styles={buildStyles({
    pathColor: `${color}`,
    textColor: `${color}`,
    trailColor: '#d6d6d6',
    backgroundColor: '#3e98c7', 
   })}
/>
</div>
    </div>
  </div>


  )
}


const ProgressBar = ({
 heading,
 percent,
 color
}) => {
 return (
  <>
         <div className="progress-container flex gap-5 justify-center">
           <div className="progress-heading text-sm">{heading}</div>
            <div className="progress-bar max-w-[140px] text-[10px]">
              <div className="progress" style={{ width: `${percent}%`, backgroundColor: `${color}` }}>
            <span className="progress-label">{percent}%</span>
          </div>
           </div>
         </div>
  </>
 )
}



export default Dashboard;
