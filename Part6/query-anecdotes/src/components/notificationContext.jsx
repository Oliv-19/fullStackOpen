import { createContext, useReducer } from "react"

const notificationReducer = (state, action) => {
    switch (action.type){
        case 'VOTED': 
            return {message: `anecdote "${action.payload.anecdote}" voted`, ...action.payload}
        case 'CREATED': 
            return {message: `anecdote "${action.payload.anecdote}" created`, ...action.payload}
        case 'CLEAR':
            return {message: '', isError: false}
        default:
            return state
    }
}
const NotificationContext = createContext()

export const NotificationProvider = (props)=> {
    const [notification, messageDispatch] = useReducer(notificationReducer, {message: '', isError: false})
    return (
        <NotificationContext.Provider value={{notification, messageDispatch}} >
            {props.children}
        </NotificationContext.Provider>
    )
}
export default NotificationContext