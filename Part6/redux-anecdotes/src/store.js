import { configureStore} from '@reduxjs/toolkit'
import filterSlice from './reducers/filterReducer'
import anecdoteSlice from './reducers/anecdoteReducer'
import notificationSlice from './reducers/notificationReducer'

const store = configureStore({
    reducer : {
        anecdotes: anecdoteSlice,
        filter: filterSlice,
        notifications: notificationSlice

    }
})

export default store