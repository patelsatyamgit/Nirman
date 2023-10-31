import React, { useEffect } from 'react'
import { getRefferDetails } from '../../services/operations/auth'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import "../../App.css"

const Reffer = () => {
    const [full,setfull]=useState([]);
    const [half,sethalf]=useState([]);
    const {token}= useSelector((state)=>state.auth);
    const [tab,settab]=useState(1);
    const [data,setdata]=useState([]);
    const [loading,setLoading]=useState(false);
    const getReff=async()=>{
        setLoading(true);
        try {
            const result=await getRefferDetails(token);
            // console.log(result)
            const fulll=result.filter((item)=>item.status=="Complete")
            const halff=result.filter((item)=>item.status!="Complete")
            
            setfull(fulll);
            setdata(full);
            sethalf(halff);
            // console.log(halff,full)
        } catch (error) {
            console.log(error);
            
        }
        setLoading(false);
    }
    useEffect(()=>{
        getReff();
    },[]);
    useEffect(()=>{
            if(tab===1){
                setdata(full);
            }
            else{
                setdata(half);
            }
    },[,tab,full,half])
  return (
    <div className='md:px-10 py-10'>
        <h1 className='font-bold text-2xl text-red-400'> Reffer Information</h1>
        <p className='text-xl font-mono'>Reffer && Earn <span className='text-green-600 font-bold'>999<sup>+</sup></span></p>

        <div  className='flex justify-between px-6'>
           <div className='flex gap-5 mt-3'>
           <button onClick={()=>{
                settab(1);
            }} className={`${tab==1?"bg-gray-700":"bg-gray-500"} text-white font-bold px-4 rounded-lg py-1`}>Completed</button>
            <button onClick={()=>{
                settab(2);
            }}  className={`${tab==2?"bg-gray-700":"bg-gray-500"} text-white font-bold px-4 rounded-lg py-1 relative`}>Uncomplete
        
            </button>
           </div>
           <div className='flex gap-3'>
            <h4 className='text-red-600 font-bold'>CashBack</h4>
            <p className='font-bold text-green-600 animate-bounce'>{full.length * 999}</p>
           </div>
        </div>

        <div>
            {
                loading ?  <div>
                <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
     </div> :  <div className='h-[60vh] overflow-auto relative'>

<Table className="mt-4 mb-2 relative ">
<Thead className="border-b-1 border-[2px] border-black sticky bg-gray-500 top-0 left-0 px-3">
<Tr className="px-2">
  <Th className="text-start">Name</Th>
  <Th className="text-start">Mobile No.</Th>
  <Th className="text-start">Email id</Th>
  <Th className="text-start">Status</Th>
</Tr>
</Thead>

<Tbody>

{
    data && data.map((item,index)=>(
            <Tr className="" key={index}>
            <Td>{item.Name}</Td>
            <Td>{item.PhoneNumber}</Td>
            <Td>{item.Email}</Td>
            <Td>{tab==1 ?<span className='text-green-500 font-bold'>Completed 999+</span>:<span className='text-red-600 font-bold'>UnCompleted</span>}</Td>
           
        </Tr>
    ) )
}
</Tbody>


</Table>
</div>
            }
        </div>

        
        
        
           </div>
  )
}
export default Reffer;
