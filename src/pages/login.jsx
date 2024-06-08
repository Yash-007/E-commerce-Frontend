import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../firebase';
import toast from 'react-hot-toast';
import { getUser, loginUser } from '../api calls/user';
import { useDispatch } from 'react-redux';
import { userExists, userNotExists } from '../redux/userSlice';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Login() {
    const dispatch = useDispatch();
    const [gender, setGender] = useState("");
    const [date, setDate] = useState("");

 const loginHandler = async()=>{
    try {
      const provider = new GoogleAuthProvider();
      const {user} = await signInWithPopup(auth, provider);
      const response= await loginUser({
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      gender,
      dob: date,
      _id: user.uid,
     });

     if(response?.success){
      toast.success(response.message);
      const data = await getUser(user.uid);
      dispatch(userExists(data?.user));
     }
     else{
      const message= response?.response?.data?.message;
      toast.error(message);
      dispatch(userNotExists());
     }
     } catch (error) {
      toast.error("Sign In Fail");
    }
 }
  return (
    <div>
  <div onClick={()=>window.history.back()} className='rounded-full bg-orange-500 text-white cursor-pointer w-10 py-2 px-2'>
  <ArrowBackIcon/>
  </div>
    <main className='w-[300px] sm:w-[400px] mx-auto my-20 border border-stroke py-10 px-6 shadow-xl'>
      <h1 className="text-3xl tracking-wider font-[300] text-center">LOGIN</h1>
      <div className='mt-10'>
        <div>
        <label>Gender</label>
        </div>
        <div>
        <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full mt-1 rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter " >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        </div>
      </div>

      <div className='mt-4'>
        <div>
        <label>Date of birth</label>
        </div>

        <div>
        <input
          type="date"
          className='w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 font-medium outline-none mt-1'
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        </div>
      </div>

      <div className='mt-12 flex flex-col gap-4 justify-center'>
        <button className='mx-auto text-center' onClick={loginHandler}>
         <div className='flex items-center mt-2'>
          <img className='w-10 h-10 border border-stroke rounded-l-sm' src="https://cdn-teams-slug.flaticon.com/google.jpg" alt="" />
          <span className='bg-[#3f50b5] text-white py-2 px-3 rounded-r-sm'>SIGN IN WITH GOOGLE</span>
        </div>
        </button>
      </div>
    </main>
  </div>  )
}

export default Login