import { configureStore} from '@reduxjs/toolkit'
import notificationSlice from './reducers/notificationReducer'
import blogsSlice from './reducers/BlogsReducer'

const store = configureStore({
    reducer : {
        notifications: notificationSlice,
        blogs: blogsSlice

    }
})

export default store