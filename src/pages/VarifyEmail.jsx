import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import OtpInput from 'react-otp-input';
import { Link, useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { signUp } from '../services/operations/auth';
import "../App.css"

const VarifyEmail = () => {
    const {loading,signupData}=useSelector((state)=>state.auth);
    const [otp,setotp]=useState("");
    const navigate=useNavigate();
    const dispatch=useDispatch();

    useEffect(()=>{
        if(!signupData){
            navigate("/signup")
        }
        // console.log("signupdata",signupData)
    },[]);

    const submitHandler=()=>{
        const {firstName,lastName,email,password,confirmPassword,mobile,refid}=signupData;
        const nameG=`${firstName} ${lastName}`
        dispatch(signUp(nameG,email,password,confirmPassword,mobile,refid,otp,navigate));

    }

  return (
    <div className='text-richblack-900 flex justify-center w-full h-screen bg-richblack-900  px-4'>
        
            {
                loading?(
                   
                    <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
               
                ):(

                    <div className='flex flex-col items-start mt-10 w-[90%] md:w-[370px] relative gap-2' >
                        <h1 className='text-richblack-50 text-2xl font-inter font-bold'>Verify email</h1>
                        <p className='text-richblack-200'>A verification code has been sent to you. Enter the code below</p>
                        <form onSubmit={submitHandler} className='flex flex-col gap-4 w-full'>
                        <OtpInput
                            value={otp}
                            onChange={setotp}
                            numInputs={6}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => <input {...props} className='bg-richblack-800 text-richblack-25 text-xl  md:h-[44px] mx-2  w-[20px] md:w-[40px]' style={{textAlign:"center"}} required />}
                            
                            />
                            <button className='bg-yellow-400 w-full rounded-xl py-2' type='submit'>Verify email</button>
                        </form>
                        <div>
                        <div className='text-richblack-100 '>
                            <Link to="/login" className='flex gap-3  items-center'>
                            <BiArrowBack/>
                            <p>
                                Back to login
                            </p>
                            </Link>
                        </div>
                        </div>
                    </div>
                )
            }

    </div>
  )
}
export default VarifyEmail;