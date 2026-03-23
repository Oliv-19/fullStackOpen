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
        },
        like(state, action){
            const toLike = state.find(b => b.id == action.payload)
            const likedBlog = { ...toLike, likes: toLike.likes + 1 };
            return state.map(b=> b.id !== action.payload ? b: likedBlog)
        },
        commentBlog(state, action){
            const toComment = state.find(b => b.id == action.payload.id)
            const commentedBlog = { ...toComment, comments: toComment.comments.concat(action.payload.comment)};
            return state.map(b=> b.id !== action.payload.id ? b: commentedBlog)
        }
    }

})
const {setBlogs, newBlog, like, commentBlog}= blogsSlice.actions

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
export const deleteBlog = (blog)=>{
    return async (dispatch) => {
    await blogService.destroy(blog);
    dispatch(getAllBlogs())
  }
}

export const likeBlog = (blog)=> {
    return async (dispatch) => {
        const likedBlog = { ...blog, likes: blog.likes + 1 };
        dispatch(like(blog.id))
        await blogService.update(likedBlog);
    }
}
export const addComment = (blog, comment)=> {
    return async (dispatch) => {
        dispatch(commentBlog({id: blog.id, comment}))
        await blogService.addComment({id: blog.id, comment});
    }
}
export default blogsSlice.reducer