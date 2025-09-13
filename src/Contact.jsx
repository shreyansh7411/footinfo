import React from 'react'
import { useNavigate } from 'react-router-dom';

const Contact = () => {
    const navigate = useNavigate();
  return <>
    <div className='min-h-screen flex flex-col gap-4'>
      <div className='flex text-white'>you can contact me at -<p className='text-purple-500'> shreyanshalappanavar2005@gmail.com</p></div>
      <div><button onClick={()=>navigate(-1)} className='text-white hover:text-purple-500 hover:text-2xl transition-all ease-in-out duration-500'>Go back</button></div>
    </div>
    
  </>
}

export default Contact
