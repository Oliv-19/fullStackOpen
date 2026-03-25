import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    message: ''
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers:{
         changeNotification(state, action){
            return {message: action.payload.message}
        },
        removeNotification(state, action){
            return initialState
        },
        
    }
})
const {changeNotification, removeNotification} = notificationSlice.actions
export const setNotification = (message, timeout) => {
    return (dispatch)=>{
        dispatch(changeNotification({message}))         
        setTimeout(()=> {
            dispatch(removeNotification())
        }, timeout)
    } 
}
export default notificationSlice.reducer