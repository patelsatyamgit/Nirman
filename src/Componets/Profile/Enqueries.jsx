import React, { useEffect } from 'react'
import { useState } from 'react';
import { getEnqueries, updateQuery } from '../../services/operations/enqury';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import "../../App.css"
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const Enqueries = () => {
    const [tab,settab]=useState(1);
    const [loading,setLoading]=useState(false);
    const [Enqueries,setEnqueries]=useState(null);
    const [fullfilled,setfullfilled]=useState(null);
    const [unfullFilled,setunfullFilled]=useState(null);
    const [data,setdata]=useState(null);
    const dispatch =useDispatch();
    const [countunsolved,setcount]=useState(0);
    const [visible,setvisible]=useState(null);
    const getEnquerisDetais= async()=>{
        setLoading(true);
        try {
            const result=await getEnqueries();
            setEnqueries(result);
            setdata(result);
            // console.log("Enquries---",result);
            const fullfill=result.filter((item)=>item.status=="Resolved");
            const unfullfill=result.filter((item)=>item.status!="Resolved");
            setfullfilled(fullfill);
            setcount(unfullfill.length);
            setunfullFilled(unfullfill);
        } catch (error) {
             console.log(error);
        }
        setLoading(false);
    }
    useEffect(()=>{
              getEnquerisDetais();
             
    },[])
    const ResolveHandler=async(id)=>{
              try {
                 dispatch(updateQuery({id:id}));
                 unfullFilled.forEach((item)=>{
                    if(item._id===id){
                        fullfilled.unshift(item);
                    }
                 })
                 const unfullfilednew=unfullFilled.filter((item)=>item._id!==id);
                 setunfullFilled(unfullfilednew);
                 setcount(countunsolved-1);

              } catch (error) {
                  toast.error("error")
              }
    }
    useEffect(()=>{
            if(tab==1){
                setdata(Enqueries)
            }
            else if(tab==2){
                setdata(unfullFilled);
            }
            else{
                setdata(fullfilled);
            }
    },[,tab,unfullFilled,fullfilled])
  return (
    <div className='px-10 pt-8'>
        <h1 className='font-bold text-2xl'>Enqueries</h1>
        <div className='flex gap-5 mt-3'>
            <button onClick={()=>{
                settab(1);
            }} className={`${tab==1?"bg-gray-700":"bg-gray-500"} text-white font-bold px-4 rounded-lg py-1`}>ALL</button>
            <button onClick={()=>{
                settab(2);
            }}  className={`${tab==2?"bg-gray-700":"bg-gray-500"} text-white font-bold px-4 rounded-lg py-1 relative`}>UN RESOLVED
             <p className='absolute bg-green-700 w-6 h-6 -right-3 -top-1 rounded-full animate-bounce'>{countunsolved}</p>
            </button>
            <button onClick={()=>{
                settab(3);
            }}  className={`${tab==3?"bg-gray-700":"bg-gray-500"} text-white font-bold px-4 rounded-lg py-1`}>RESOLVED</button>
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
  <Th className="text-start">Query</Th>
  {
    tab==2 &&   <Th className="text-start">Action</Th>
  }
   {
    tab==3 &&   <Th className="text-start">Status</Th>
  }


</Tr>
</Thead>

<Tbody>

{
    data && data.map((item,index)=>(
            <Tr className="" key={index}>
            <Td>{item.Name}</Td>
            <Td>{item.mobileNumber}</Td>
            <Td>{item.EmailID}</Td>
            <Td className="relative">{item.Enquiry.substring(0,20)}..{item.Enquiry.length >20 && <span className='text-sm text-blue-600 underline cursor-pointer relative' onClick={()=>{
                setvisible(item._id);
            }} >readmore</span>}

           {
            visible && visible==item._id && <div className='w-[200px] absolute bg-white min-h-[100px] rounded-md px-2 py-2 right-6 top-9 z-50'>
                <p onClick={()=>setvisible(null)} className='font-bold cursor-pointer'>x</p>
                <div className='absolute w-[50px] h-[50px] -top-2 left-3 -z-10 bg-white rotate-45'></div>
                {item.Enquiry}
            </div>
           }
            
            </Td>
            {
                tab==2 &&  <Td>
                    <button className='px-3 bg-green-400 border-r-emerald-600 rounded-lg' onClick={()=> ResolveHandler(item._id)}>Resolve</button>
                </Td>
            }
            {
                tab==3 &&  <Td className="text-green-500 font-bold">Resolved</Td>
            }
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

export default Enqueries;