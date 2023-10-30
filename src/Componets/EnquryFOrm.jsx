import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setLoading, setSignupData } from "../slices/authSlice"
import { sendOtp } from "../services/operations/auth"
import { createEnqury } from "../services/operations/enqury"


function EnquryFOrm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // student or instructor

  const [formData, setFormData] = useState({
    Name: "",
    EmailId: "",
    MobileNumber:"",
    Enquiry:""
  })

  const { Name, EmailId,MobileNumber ,Enquiry} = formData

  

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

    dispatch(createEnqury(Enqurydata))

    // Reset
    setFormData({
      Name: "",
      EmailId: "",
      MobileNumber:"",
      Enquiry:""
    })
  }
  return (
    <div>
      {/* Form */}
      <form onSubmit={handleOnSubmit} method="put" className="flex w-full flex-col gap-y-4">
        <div className=" gap-x-4">
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
             Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="Name"
              value={Name}
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
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="EmailId"
            value={EmailId}
            onChange={handleOnChange}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem]  p-[12px] text-black"
          />
        </label>
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Mobile Number <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="number"
            name="MobileNumber"
            value={MobileNumber}
            onChange={handleOnChange}
            placeholder="Enter mobile number"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem]  p-[12px] text-black"
          />
        </label>
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Enqury <sup className="text-pink-200">*</sup>
          </p>
          <textarea
            required
            type="text"
            name="Enquiry"
            value={Enquiry}
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

export default EnquryFOrm;