import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

 const Account = () => {
    const {user}=useSelector((state)=>state.auth);
    const navigate=useNavigate();
  return (
    <div className='px-10 py-10'>
        <h1 className='font-bold text-2xl'>Dmate Account Information</h1>
        <h1 className='text-red-400 font-bold text-xl'>Well Come - <span className='text-red-700 capitalize'>{user.Name}</span></h1>
        <div className='w-full h-[1px] my-2 bg-black'></div>

        <div className='relative flex flex-col md:flex-row '>
            <div className='w-[50%] md:px-20 py-10 flex flex-col  gap-6'>
               <div className='flex justify-between flex-col md:flex-row'>
               <h1 className='font-bold text-xl'>Name</h1>
               <div className='capitalize  bg-gray-600 w-[250px] text-white font-bold px-2 rounded '>
                {user.Name}
               </div>
               </div>
               <div className='flex justify-between flex-col md:flex-row'>
               <h1 className='font-bold text-xl'>Email ID</h1>
               <div className='capitalize  bg-gray-600 w-[250px] text-white font-bold px-2 rounded '>
                {user.Email}
               </div>
               </div>
               <div className='flex justify-between flex-col md:flex-row'>
               <h1 className='font-bold text-xl'>Mobile no.</h1>
               <div className='capitalize  bg-gray-600 w-[250px] text-white font-bold px-2 rounded '>
                {user.PhoneNumber}
               </div>
               </div>
               <div className='flex justify-between flex-col md:flex-row'>
               <h1 className='font-bold text-xl'>Dmate account</h1>
               <div className='capitalize  bg-gray-600 w-[250px] text-white font-bold px-2 rounded '>
                {user?.status=="Complete" ? <span className='text-green-500'>Complete</span>:<span className='text-red-500'>Not yet</span>}
               </div>
               </div>
            </div>
            <div className='md:w-[50%] py-6'>
                {
                    user?.status=="Complete"? <div>
                          <div className='w-full mt-4'>
                <h1 className='text-2xl'>Account <span className='text-green-500 text-sm font-bold'>Varified</span></h1>

                <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 md:w-[300px] md:h-[150px] mt-5 px-6  py-3 relative flex justify-between flex-col'>

                <div className='flex justify-between gap-2'>
                <div>
                  <h3 className='font-bold text-green-300'>Dmate Card</h3>
                    <h2 className='text-gray-200 -tracking-tight'>{user?.dmateInfo?.accNumber}</h2>

                    <h4 className='text-white'>Exp. <span className='text-sm'>12/44</span>  Cvv- <span className='text-sm'>111</span></h4>
                  </div>
                  <div>
                    <img className='w-[100px] rounded-lg' src={user?.dmateInfo?.image} alt="" />
                  </div>
                </div>

                <div className='flex justify-between'>
                    <h1 className='text-white font-bold '>Account Holder</h1>
                    <p className='capitalize text-yellow-200'>{user?.Name}</p>
                </div>
            
                </div>

            </div>

                    </div>:<div >
                        <h1 className='text-xl font-bold text-gray-400'>You dont have Dmate account</h1>
                        <button className='text-white bg-blue-600 px-6 my-3 rounded-md py-1 font-bold' onClick={()=>{
                            navigate("/createDmate")
                        }}>Create Demate Account</button>
                        <h1 className='font-bold text-xl text-green-600'>Why Demate account</h1>
                        <div className='pl-6 text-gray-600'>
                            <p>1.Easy Share Transfers</p>
                            <p>2.Freezing Demat Account</p>
                            <p>3.Easy Dematerialization of Securities</p>
                            <p>4.Receiving Benefits and Stock Dividends</p>
                            <p>5.Reduced Risk</p>
                            <p>6.Faster Transactions</p>
                        </div>
                    </div>
                }

            </div>
          
        </div>
    </div>
  )
}


export default Account;
