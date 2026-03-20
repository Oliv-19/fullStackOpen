import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";


const blogsSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers:{
        setBlogs(state, action){
            return action.payload
        },
        newBlog(state, action){
            state.push(action.payload)
        }
    }

})
const {setBlogs, newBlog}= blogsSlice.actions

export const getAllBlogs= () => {
    return async (dispatch) => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => a.likes + b.likes);
    dispatch(setBlogs(blogs))
  }
}

export const AddNewBlog= (blog) => {
    return async (dispatch) => {
    const blogs = await blogService.create(blog)
    dispatch(newBlog(blogs))
  }
}

export default blogsSlice.reducer