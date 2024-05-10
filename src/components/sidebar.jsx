import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import '../index.css'
import logo from '../assets/logo-Meta.png';

const variants = {
    expanded: { width: "23%" },
    nonExpanded: { width: "5%" }
}

const navItems1 = [
    {
        name: "Dashboard",
        icon: DashboardIcon,
        url:"/admin/dashboard",
    },
    {
        name: "Product",
        icon: ProductionQuantityLimitsIcon,
        url:"/admin/products"
    },
    {
        name: "Customer",
        icon: PeopleIcon,
        url:'/admin/customers',
    },
    {
        name: "Transaction",
        icon: ReceiptIcon,
        url:'/admin/transactions',
    },
    {
        name: "Coupons",
        icon: CreditCardIcon,
        url:'/admin/coupons',
    },
]

const navItems2 = [
    {
        name: "Bar",
        icon: BarChartIcon,
        url:"/admin/chart/bar",
    },
    {
        name: "Pie",
        icon: PieChartIcon,
        url:"/admin/chart/pie"
    },
    {
        name: "Line",
        icon: StackedLineChartIcon,
        url:'/admin/chart/line',
    },
]

const Sidebar = () => {
    const navigate = useNavigate();
    const [activeNavIndex, setActiveNavIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width <= 768) {
                setIsExpanded(false);
            }
            else {
                setIsExpanded(true);
            }
        }

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])
    

    return (
        <motion.section
            animate={isExpanded ? "expanded" : "nonExpanded"}
            variants={variants}
            className={'w-1/5 bg-white flex flex-col justify-between items-center gap-10 relative shadow-xl overflow-y-auto overflow-x-hidden sidebar ' + (isExpanded ? 'py-8 px-6' : 'px-9 py-6')}
            style={{height: '100vh' }}
        >

            <div className='flex flex-col justify-center items-center gap-8 min-w-[100%]'>
                {(isExpanded ? (<div id="logo-box" className='flex gap-2'>
                   <img className='h-8 w-16 ' src={logo} alt="" />
                    <h1 className='text-black font-[600] text-2xl lg:text-2xl font-[poppins] '>Cartopia </h1> </div>) : (<div className='flex justify-center items-center'><img className='h-8 w-16 ' src={logo} alt="" /></div>))}


                <div id='navlinks-box' className='flex flex-col justify-center items-start gap-4 w-full md:w-[90%] lg:w-full mt-3'>
                  <h5 className={(isExpanded ? 'block text-md text-[gray] tracking-wider' : 'hidden ')}>DASHBOARD</h5>
                    {navItems1.map((item, index) => (
                        <div key={item.name} id="link-box" className={'flex justify-start items-center gap-4 w-full cursor-pointer rounded-md ' +
                            (location.pathname.includes(item?.url) ? 'bg-[#e5f1ff] text-[#5356FF]' : 'text-black hover:bg-[gray] transition-all duration-300 ') +
                            (isExpanded ? ' px-6 py-2' : ' p-2')}
                            onClick={() => {navigate(item?.url)}}
                        >
                            <div className={'bg-[white] p-1 rounded-full '}>
                                <item.icon className='md:w-4 w-3 h-3 md:h-4' />
                            </div>
                            <span className={'text-lg ' + (isExpanded ? 'flex text-sm font-[600] font-[poppins] ' : 'hidden')}>{item?.name}</span>
                        </div>
                    ))}
                </div>

                <div id='navlinks-box' className='flex flex-col justify-center items-start gap-4 w-full md:w-[90%] lg:w-full mt-3'>
                  <h5 className={(isExpanded ? 'block text-md text-[gray] tracking-wider' : 'hidden ')}>CHARTS</h5>
                    {navItems2.map((item, index) => (
                        <div key={item.name} id="link-box" className={'flex justify-start items-center gap-4 w-full cursor-pointer rounded-md ' +
                            (location.pathname.includes(item?.url) ? 'bg-[#e5f1ff] text-[#5356FF]' : 'text-black hover:bg-[gray] transition-all duration-300 ') +
                            (isExpanded ? ' px-6 py-2' : ' p-2')}
                            onClick={() => {navigate(item?.url)}}
                        >
                            <div className={'bg-[white] p-1 rounded-full '}>
                                <item.icon className='md:w-4 w-3 h-3 md:h-4' />
                            </div>
                            <span className={'text-lg ' + (isExpanded ? 'flex text-sm font-[600] font-[poppins] ' : 'hidden')}>{item?.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div id='expanded-icon' className='bg-yellow-500 text-black p-2 rounded-full cursor-pointer absolute -right-4 bottom-20
           md:bottom-30 md:flex hidden shadow-all' onClick={() => setIsExpanded(!isExpanded)}>
                <KeyboardDoubleArrowLeftIcon />
            </div>

        </motion.section>

    )
}

export default Sidebar