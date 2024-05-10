import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../api calls/user';
import Header from '../../components/header';
import { Skeletons } from '../../components/loader';
import Sidebar from '../../components/sidebar';
import TableHOC from '../../components/tableHOC';
import { getAllUsersAsync, removeUser } from '../../redux/userSlice';

const columns = [
  {
    Header: "Avatar",
    accessor: "avatar"
  },
  {
    Header: "Name",
    accessor: "name"
  },
  {
    Header: "Gender",
    accessor: "gender"
  },
  {
    Header: "Email",
    accessor: "email"
  },
  {
    Header: "Role",
    accessor: "role"
  },
  {
    Header: "Action",
    accessor: "action"
  },
];

function customers() {
  const { user, allUsers, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);


  const deleteHandler = async (userId) => {
    const response = await deleteUser(userId, user?._id);
    if (response?.success) {
      toast.success(response.message);
      dispatch(removeUser(userId))
    }
    else {
      toast.error(response?.response?.data?.message);
    }s
  }

  useEffect(() => {
    setLoading(true);
    dispatch(getAllUsersAsync(user._id));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (allUsers.length > 0) {
      setRows(
        allUsers.map((usr) => ({
          avatar: <Avatar src={usr.photo}/>,    
          name: usr?.name,
          gender: usr?.gender,
          email: usr?.email,
          role: usr?.role,
          action: <span onClick={() => deleteHandler(usr._id)}><DeleteIcon sx={{ color: 'red', cursor: 'pointer' }} /></span>,
        }))
      )
    }
  }, [allUsers]);

  function generateColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xff;
      color += value.toString(16).padStart(2, '0');
    }
    return color;
  }

  const Table = TableHOC(
    columns,
    rows,
    "",
    "Customers",
    rows.length > 6,
    false
  )();


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

export default customers