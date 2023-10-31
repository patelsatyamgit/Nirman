import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Link, Outlet, useNavigate } from 'react-router-dom';
import { profilefun } from '../data/profileFuntions';
import { logout } from '../services/operations/auth';

const Profile = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {user}=useSelector((state)=>state.auth);
  return (
    <div className='bg-gray-300 h-[78vh] w-full flex flex-col md:flex-row relative'>
        {/* sideBar  */}
        <div className='bg-gray-500 md:w-[25%] '>
            <div className=' px-3 py-3 flex gap-3'>
                <img src={`https://api.dicebear.com/5.x/initials/svg?seed=${user.Name.split(" ")[0]} ${user.Name.split(" ")[1]}`} alt="" className='rounded-full w-[25%]' />
                <div>
                    <h1 className='font-bold text-2xl'>{user.Name}</h1>
                    <p>Mobile no -{user.PhoneNumber}</p>
                    <p>Email Id -{user.Email}</p>
                </div>
            </div>
            <div className='md:w-[80%] h-[1px] bg-black mx-auto'>
            </div>

            <div className='flex flex-col items-center justify-center mt-6 gap-6 '>
                {
                    profilefun.map((item,index)=>{
                        return item.id===3 ? user.accountType==="Admin" ? <Link key={index} to={"/my-profile/enqury"} className='font-bold'>
                              {item.Name}
                        </Link>:"":<Link key={index} className='font-bold' to={`/my-profile/${item.Name.replace(" ","")}`}>
                              {item.Name}
                        </Link>
                    })
                }
                <button className='font-bold' onClick={()=>{
                    dispatch(logout(navigate));
                }}>Log out</button>
            </div>
        </div>
        {/* outlet */}
        <div className='md:w-[75%]'>
            <Outlet/>
        </div>
    </div>
  )
}

export default Profile;
