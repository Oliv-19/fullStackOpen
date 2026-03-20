import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const userSlice = createSlice({
    name : 'user',
    initialState : null,
    reducers:{
        setUser (state, action){
            return action.payload
        }
    }
})
const {setUser} = userSlice.actions
export const saveUser = (user) => {
    return (dispatch) => {
        dispatch(setUser(user))
        blogService.setToken(user.token);
    }

}

export default userSlice.reducer