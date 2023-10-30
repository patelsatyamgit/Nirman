import { toast } from "react-hot-toast";
import {endpoints} from "../apis"
import {apiConnector}  from "../apiconnector";
import { setUser } from "../../slices/authSlice";
// import { setToken } from "../../slices/authSlice";


const {CREATEDEMATE_URL}=endpoints;

export function createDemateAccount(token,data,navigate){
    return async(disptach)=>{
      const id=toast.loading("creating account");
        try {

            const response= await apiConnector("POST", CREATEDEMATE_URL,data,{
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            })

            console.log("CreateDemate account response--",response);

            if (!response.data.success) {
                toast.dismiss(id);
                throw new Error(response.data.message)
              }


              const user=response?.data?.usernewInfo;
              localStorage.setItem("user", JSON.stringify(user));
              disptach(setUser(user));
              toast.success("Dmate account created successfully");

              navigate("/my-profile/DMateAccount");
            
        } catch (error) {
            toast.error("Error in account creation");
        }

        toast.dismiss(id);

    }
}
