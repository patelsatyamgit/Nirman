import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    user:localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")):null,
    signupData:null,
    loading:false,
    token:localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")):null,
}

const authSlice =createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setSignupData(state,value){
            state.signupData=value.payload;
        },
        setLoading(state,value){
            state.loading=value.payload;
        },
        setUser(state,value){
            state.user=value.payload;
        },
        setToken(state,value){
            state.token=value.payload;
        },
    }
});

export const {setSignupData,setLoading,setToken,setUser}=authSlice.actions;

export default authSlice.reducer;