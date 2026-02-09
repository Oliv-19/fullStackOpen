import { createSlice } from "@reduxjs/toolkit";

const initialState = {message: '', isError: false}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers : {
        changeNotification(state, action){
            if(action.payload.isError){
                return {message: action.payload.message, isError: true}
            }
            return {message: action.payload.message, isError: false}
        },
        removeNotification(state, action){
            return initialState
        }
    }
})

export const {changeNotification, removeNotification} = notificationSlice.actions
export default notificationSlice.reducer