import React from 'react'
import heroImage from "../assets/banner-img.svg"
import ok30plus from "../assets/30_plus.svg"
import { Link } from 'react-router-dom'
const Homepage = () => {
  return (
    <div className='bg-white relative'>

        
        {/* first section 
         */}
         <div className='w-full bg-gray-200'>
            <div className='w-11/12 mx-auto'>
            <div className='flex flex-col md:flex-row  justify-between py-10'>
            <div className='flex justify-center flex-col px-10 items-start gap-4'>
                <h1 className='text-[#071945] font-bold text-4xl'>Wealth Creation Through
Systematic & Innovative Ideas</h1>
            <p className='text-gray-600'>Simply to help you maximize your returns. Your interests no matter how big or small - come first.</p>
            <button className='bg-red-600 px-6 py-1 rounded-2xl text-white font-bold'>GET STARTED</button>
            </div>
            <div className='px-9'>
                <img src={heroImage} alt="bannerimage" />
            </div>
         </div>
            </div>
        </div>

       

         {/* second section  */}
        <div className='w-11/12 mx-auto'></div>
         <div className='flex justify-between flex-col md:flex-row'>
            <div className='md:w-[50%] p-11'>
                    <img src={ok30plus} alt="30+" />
            </div>
            <div className='md:w-[50%] flex justify-center flex-col pr-20'>
                <p className='  text-[#071945]'>WELCOME TO</p>
                <h1 className='text-[#071945] font-bold text-3xl'>Nirman Broking</h1>
                <p className='text-gray-400 text-sm'>Nirman group entered into the broking sector in January 1987 as a small sub broker unit by Mr. Keshav Jain and has grown by leaps and bounds over the years to flourish as a full grown broking house having membership of both the leading stock exchanges in India (NSE & BSE) as well as commodity exchange (MCX).Today we are well positioned to provide every possible broking needs of the clients ranging from IPO, Equity Broking, Derivatives, Commodity, and Advisory.</p>
                <Link>
                   <p>Know more..</p>
                </Link>

            </div>
         </div>
    </div>
  )
}

export default Homepage;
