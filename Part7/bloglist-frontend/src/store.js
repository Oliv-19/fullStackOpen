import { configureStore} from '@reduxjs/toolkit'
import notificationSlice from './reducers/notificationReducer'

const store = configureStore({
    reducer : {
        notifications: notificationSlice

    }
})

export default store