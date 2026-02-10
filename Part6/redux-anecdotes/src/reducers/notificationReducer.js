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
const {changeNotification, removeNotification} = notificationSlice.actions
export const setNotification = (message, timeout) => {
    return (dispatch)=>{
        dispatch(changeNotification(message))         
        setTimeout(()=> {
            dispatch(removeNotification())
        }, timeout)
    } 
}
export default notificationSlice.reducer