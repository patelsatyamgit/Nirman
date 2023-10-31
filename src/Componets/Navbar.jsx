import React, { useEffect } from 'react'
import { Navlink } from '../data/navlinks';
import { offersLink } from '../data/offersLink';
import { Link, useNavigate } from 'react-router-dom'
import logo from "../assets/logo.jpeg"
import { useSelector } from 'react-redux';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useState } from 'react';
import toast from 'react-hot-toast';


const Navbar = () => {
    const navigate=useNavigate();
    const [copy,setCopy]=useState(false);
    const {token,user}=useSelector((state)=>state.auth);
  
  return (
    <div className='bg-white flex justify-between items-center px-10 w-[90%] mx-auto '>
        <div>
            <Link to={"/"}>
                  <img src={logo} alt="logo" width={150} />
            </Link>
            
        </div>
        <div className='flex flex-col gap-4'>
            <div className=' md:flex gap-3 hidden'>
                {
                   offersLink &&  offersLink.map((item,index)=>(
                               <Link to={""} key={index}><div
                               style={{backgroundColor:item.color }}  className="text-white font-bold  text-sm rounded-lg py-1 px-3 hover:border-1 border-black hover:scale-105 transition-all duration-200 " > {item.Name}</div></Link>
                                
                   ))
                }

            </div>
            <div className='md:flex gap-3 hidden'>
                {
                   Navlink &&  Navlink.map((item,index)=>(
                                <Link to={""} key={index}>
                                      <div> {item.name}</div>
                                </Link>   
                   ))
                }

            </div>
            {/* login and singup  */}
            {
                !token &&  <div className='flex  justify-end gap-5 flex-col md:flex-row'>
                <button onClick={()=>{
                    navigate("/login")
                }}  className='bg-blue-600 rounded-lg  px-3 py-1 text-white'>Login</button>
                <button onClick={()=>{
                    navigate("/signup")
                }} className='bg-blue-600 rounded-lg  px-3 py-1 text-white'>SignUP</button>
            </div>
            }

            {
                token &&  <div className='flex justify-end gap-4 flex-col md:flex-row'>
                    <CopyToClipboard text={`https://nirman-sandy.vercel.app/signup/${user._id}`}>
                        <button className='bg-yellow-300 font-bold text-blue-600 px-4 rounded-md hover:bg-yellow-400 relative' onClick={()=>{
                            setCopy(true);
                            toast.success("Refer link copied share it")
                            setTimeout(() => {
                                setCopy(false);
                            }, 2000);
                        }}>Reffer
                       {
                        copy &&  <div className='absolute -top-4 text-sm bg-gray-500 text-green-400 rounded-md px-1 -right-4'>
                        Copied
                    </div>
                       }
                        </button>
                    </CopyToClipboard>
                               <button onClick={()=>{
                                 navigate("/my-profile/DMateAccount")
                               }} className='bg-blue-600 rounded-lg  px-3 py-1 text-white '>My Account</button>
                    </div>
                
            }
           
            
        </div>
    </div>
  )
}

export default Navbar;
