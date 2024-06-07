import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserType{
    id:string;
    firstName:string;
    lastName:string;
    email:string;
    phoneNumber:string;
    userName:string;
}
  const initialState: UserType = {
    id: " ",
    email: " ",
    phoneNumber:" ",
    firstName:" ",
    lastName:" ",
    userName:" "
  };

  export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
      addUserData:(state,action:PayloadAction<UserType>)=>{
        state.id = action.payload.id;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.email = action.payload.email;
        state.phoneNumber = action.payload.phoneNumber;
        state.userName =  action.payload.userName;
      },
      logout:(_state)=>{
        return initialState;
      }
    }
  })


  export default userSlice.reducer;
  export const {addUserData,logout}=userSlice.actions