import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {message: '', isError: false},
    reducers : {
        changeNotification(state, action){
            if(action.payload.isError){
                return {message: action.payload.message, isError: true}
            }
            return {message: action.payload.message, isError: false}
        }
    }
})

export const {changeNotification} = notificationSlice.actions
export default notificationSlice.reducer