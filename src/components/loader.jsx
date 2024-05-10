import Skeleton from '@mui/material/Skeleton';
import React from 'react';


export const Loader = (p)=> {
  return (
     <>
    <div className="flex h-screen items-center justify-center bg-white  dark:bg-boxdark">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-300 border-t-transparent"></div>
    </div>
     </>
  )
}

export const Skeletons = ({length}) => {
   const skeletons = Array.from({length}, ()=> (
    <Skeleton variant='text' sx={{fontSize: '1rem'}}/>
   ))

   return (
    <>
      {skeletons}
    </>
   )
}

