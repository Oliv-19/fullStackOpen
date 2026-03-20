import { configureStore} from '@reduxjs/toolkit'
import notificationSlice from './reducers/notificationReducer'
import blogsSlice from './reducers/BlogsReducer'
import userSlice from './reducers/UserReducer'

const store = configureStore({
    reducer : {
        notifications: notificationSlice,
        blogs: blogsSlice,
        user: userSlice,

    }
})

export default store