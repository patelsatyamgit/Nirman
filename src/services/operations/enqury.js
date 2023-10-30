
import { toast } from "react-hot-toast";
import {endpoints} from "../apis"
import {apiConnector}  from "../apiconnector";
// import { setToken } from "../../slices/authSlice";


const {CREATEENQUERY_URL,GETENQUERIES_URL,UPDATAEQUERIES_URL}=endpoints;

export function createEnqury(data){
    return async(dispatch)=>{
        const id=toast.loading("sending");

        try {

            const apiResponse=await apiConnector("POST",CREATEENQUERY_URL,data);

            // console.log("create query api response--",apiResponse);

            if (!apiResponse.data.success) {
                toast.dismiss(id);
                toast.error("Login error");
                throw new Error(apiResponse.data.message)
              }

              toast.success("Enquriy submited successfully");
            
        } catch (error) {
            toast.error("Try again")
            console.log(error);
        }
           toast.dismiss(id);
    }
}
export const getEnqueries=async ()=>{
    let enqueries=null;
   const id= toast.loading("loading")
   try {

            const response=await apiConnector("GET",GETENQUERIES_URL);
            if (!response.data.success) {
                toast.dismiss(id);
                toast.error("Login error");
                throw new Error(response.data.message)
              }

            //   console.log("getqueri api response---",response);
              enqueries=response?.data?.enquries;
              toast.success("Enqueries fetched successfull");
    
   } catch (error) {
        toast.error("enquery fetching error");
   }
   toast.dismiss(id);
   return enqueries;

}

export function updateQuery(data){
    return async()=>{

        const id=toast.loading("updating");
                try {
                    const response=await apiConnector("POST",UPDATAEQUERIES_URL,data);

                    if (!response.data.success) {
                        toast.dismiss(id);
                        toast.error("Login error");
                        throw new Error(response.data.message)
                      }

                      console.log("updataquery api response--",response);

                      toast.success("query resolvedSuccessfully");

                } catch (error) {
                    toast.error("error in resolved");
                }

                toast.dismiss(id);
    }
}