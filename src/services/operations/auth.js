
import { toast } from "react-hot-toast";
import {endpoints} from "../apis"
import {apiConnector}  from "../apiconnector";
// import { setToken } from "../../slices/authSlice";
import { setLoading } from "../../slices/authSlice";
import { setUser,setToken } from "../../slices/authSlice";



const {SENDOTP_URL,SIGNUP_URL,LOGIN_URL,GETREFFERD_URL}=endpoints;



export function sendOtp(email,navigate){
  
    return async(dispatch)=>{
        dispatch(setLoading(false));
        try {
            
            const response = await apiConnector("POST",SENDOTP_URL,{Email:email,checkUserPresent:true});

            if(!response.data.success){
                toast.error(response.data?.message);
                // throw new Error(response.data?.message);
            }

            toast.success("OTP Sent Successfully");
            navigate("/verify-email");
        } catch (error) {
            // console.log("SENDOTP API ERROR......",error);
            if(error.response.status === 409){
              toast.success("User already register please login");
            
              navigate("/login")}
        }
        dispatch(setLoading(false));
    }
}

export const getRefferDetails=async (token)=>{

  let refferD=[];
  const id=toast.loading("loading");
  try {
            const response=await apiConnector("GET",GETREFFERD_URL,null,{
              Authorization: `Bearer ${token}`,
          });

          if(!response.data.success){
            toast.dismiss(id);
            toast.error("signupERROR");
            throw new Error(response.data.message);
        }

        refferD=response?.data?.user?.reffers;

  } catch (error) {
    console.log(error);
    toast.error("error in Reffer getting")
  }

  toast.dismiss(id);
  return refferD;

}

export function signUp(
    nameG,
    email,
    password,
    confirmPassword,
    mobile,
    refid,
    otp,
    navigate
){
    return async(dispatch)=>{
        const toastId=toast.loading("Lodiing...");
        dispatch(setLoading(true));
        try {
            const response=await apiConnector("POST",SIGNUP_URL,{
                Name:nameG,
                Email:email,
                Password:password,
                ConfirmPass:confirmPassword,
                Mobile:mobile,
                refid:refid,
                otp,
            })

            if(!response.data.success){
                toast.dismiss(toastId);
                toast.error("signupERROR");
                throw new Error(response.data.message);
            }


            toast.success("Signup successful");
            navigate("/login");
        } catch (error) {
            // console.log("SIGNUP API ERROR....",error);
            toast.error("Signup Failed");
            navigate("/signup");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}


export function login(email, password, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", LOGIN_URL, {
          email,
          Password:password,
        })
  
        // console.log("LOGIN API RESPONSE............", response)
  
        if (!response.data.success) {
          toast.dismiss(toastId);
          toast.error("Login error");
          throw new Error(response.data.message)
        }
  
        toast.success("Login Successful")
        dispatch(setToken(response.data.token))
        const userImage = response.data?.user?.image
          ? response.data.user.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
        dispatch(setUser({ ...response.data.user, image: userImage }))
        localStorage.setItem("token", JSON.stringify(response.data.token))
        localStorage.setItem("user",JSON.stringify(response.data.user));
        localStorage.setItem("profilepic",JSON.stringify(response.data.user?.image));
        navigate("/my-profile")
      } catch (error) {
        toast.error("Login Failed")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
  export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/")
    }
  }