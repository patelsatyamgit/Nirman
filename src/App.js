import "./App.css";
import { Route,Routes } from "react-router-dom";
import Navbar from "./Componets/Navbar";
import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VarifyEmail from "./pages/VarifyEmail";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import PrivateRoute from "./Componets/PrivateRoute"
import EnquiryFOrm from "./pages/EnquiryFOrm";
import Enqueries from "./Componets/Profile/Enqueries";
import Errorpage404 from "./pages/Errorpage404";
import Account from "./Componets/Profile/Account";
import CreateAccount from "./Componets/Profile/CreateAccount";
import Reffer from "./Componets/Profile/Reffer";
function App() {
  const {token}=useSelector((state)=>state.auth);
  const {user}=useSelector((state)=>state.auth);
  return (
            <div className="relative bg-gray-200 min-h-screen">
              <Navbar/>

              
              <Routes>
                        <Route path="*" element={<Errorpage404/>}>
              </Route>
                     <Route path="/" element={<Homepage/>}>
                     </Route>
                     <Route path="/Enquery" element={<EnquiryFOrm/>}></Route>
                     {
                      !token &&  <Route path="/signup" element={<Signup/>}></Route>
                     }
                      {
                      !token &&  <Route path="/signup/:referalId" element={<Signup/>}></Route>
                     }
                     {
                      !token && <Route path="/login" element={<Login/>}></Route>
                     }
                    
                    
                     
                    
                     <Route path="/verify-email" element={<VarifyEmail/>}></Route>
                      <Route path="/my-profile" element={ <PrivateRoute><Profile/></PrivateRoute>}>
                    {
                      user?.accountType =="Admin" && <Route path="/my-profile/enqury" element={<Enqueries/>}>

                      </Route>
                    }   
                    

                    <Route path="/my-profile/DMateAccount" element={<PrivateRoute><Account/></PrivateRoute>}>

                    </Route>
                    <Route path="/my-profile/ReferStatus" element={<PrivateRoute><Reffer/></PrivateRoute>}>

                    </Route>
                   
                   
                      </Route>

                      <Route path="/createDmate" element={<PrivateRoute><CreateAccount/></PrivateRoute>}>

</Route>
                      
                    
                     

              </Routes>

              
            </div>
  );
}

export default App;
