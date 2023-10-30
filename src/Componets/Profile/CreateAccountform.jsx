import { useState } from "react"
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createDemateAccount } from "../../services/operations/dmate";
function CreateAccountform() {
 
  // student or instructor

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [formData, setFormData] = useState({
    PanNumber: "",
    Profession:""
  })

  const [Image,setImage]=useState(null);
  const [PanImage,setPanImage]=useState(null);

  const { PanNumber ,Profession} = formData
  const {token}=useSelector((state)=>state.auth);

  

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault()

    const Enqurydata = {
      ...formData,
    }


    // console.log(Enqurydata);
    // db interection 
    const formdata=new FormData();

    formdata.append("panNumber",Enqurydata.PanNumber);
    formdata.append("profession",Enqurydata.Profession);
    formdata.append("panPhoto",PanImage);
    formdata.append("profilePhoto",Image);

    // console.log("image---------",PanImage,Image);
    dispatch(createDemateAccount(token,formdata,navigate));
  
    // Reset
    setFormData({
      PanNumber: "",
      Profession:""
    })
  }
  return (
    <div>
      {/* Form */}
      <form onSubmit={handleOnSubmit} method="put" className="flex w-full flex-col gap-y-4">
        <div className=" gap-x-4">
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
             PanNumber <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="PanNumber"
              value={PanNumber}
              onChange={handleOnChange}
              placeholder="Enter first name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
        </div>
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Profile image <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="file"
            accept="image/*"
            name="Image"
            onChange={(e)=>setImage(e.target.files[0])}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem]  p-[12px] text-black"
          />
        </label>
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Pan image <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="file"
            name="PanImage"
            onChange={(e)=>setPanImage(e.target.files[0])}
            placeholder="Enter mobile number"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem]  p-[12px] text-black"
          />
        </label>
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Profession <sup className="text-pink-200">*</sup>
          </p>
          <textarea
            required
            type="text"
            name="Profession"
            value={Profession}
            onChange={handleOnChange}
            placeholder="Enter your Enqury"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem]  p-[12px] text-black"
          />
        </label>
      
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-400 py-[8px] px-[12px] font-medium text-richblack-900"
        >
             Submit your query
        </button>
      </form>
    </div>
  )
}

export default CreateAccountform;