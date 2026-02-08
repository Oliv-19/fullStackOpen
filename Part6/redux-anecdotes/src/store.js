import { configureStore} from '@reduxjs/toolkit'
import reducer from './reducers/anecdoteReducer'
import filterSlice from './reducers/filterReducer'

const store = configureStore({
    reducer : {
        anecdotes: reducer,
        filter: filterSlice

    }
})

export default store