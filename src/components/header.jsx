import LocalMallIcon from '@mui/icons-material/LocalMall';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, Menu, MenuItem } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PaddingIcon from '@mui/icons-material/Padding';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { auth } from '../firebase';
import '../index.css';
import { userNotExists } from '../redux/userSlice';


const Header = ({user}) => {
    const [open,setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

        const logoutHandler=async()=>{
        try {
            await signOut(auth);
            localStorage.removeItem("cart");
            toast.success("Signed out successfully");
            dispatch(userNotExists());
        } catch (error) {
            toast.error("Sign out failed");
        }
    }

    const handleClose =()=>{
        setOpen(false);
    }

  return (
    <>
       {/* {user && <button onClick={logoutHandler}>Logout</button>} */}

      <section className='w-full font-[poppins] bg-orange-600 shadow-md'>
        <div className='flex justify-end items-center gap-2 pr-2 pt-2 pb-2 w-full'>
        <span onClick={()=>navigate("/")} className='cursor-pointer'>HOME</span>

        <div>
        <IconButton onClick={()=> navigate("/search")}>
          <SearchIcon/>
        </IconButton>

        <IconButton onClick={()=> navigate("/cart")}>
          <LocalMallIcon/>
        </IconButton>

        <IconButton onClick={()=>setOpen(true)}>
          <PersonIcon/>
        </IconButton>
        <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {user && user?.role === 'admin' && <MenuItem onClick={()=>{handleClose(); navigate("/admin/dashboard")}}><span className='font-[poppins]'>Admin <AdminPanelSettingsIcon/></span></MenuItem>}
        {user && <MenuItem onClick={()=>{handleClose(); navigate("/orders")}}><span className='font-[poppins]'>Orders <PaddingIcon/></span></MenuItem>}
        {user ? <MenuItem onClick={()=>{ handleClose(); logoutHandler();}}><span className='font-[poppins]'>Logout <LogoutIcon/></span></MenuItem> : <MenuItem onClick={()=>{ handleClose(); navigate("/login")}}>Login <LoginIcon/></MenuItem>} 
      </Menu>
       </div>
        </div>
      </section>
    </>
  )
}

export default Header