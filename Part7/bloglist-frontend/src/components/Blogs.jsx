import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Table } from 'react-bootstrap'
import { AddNewBlog } from "../reducers/BlogsReducer";
import { setNotification } from "../reducers/notificationReducer";
import Togglable from "./Togglable";
import NewBlogForm from "./NewBlogForm";

export const Blogs = ({getBlogs}) => {
    const blogFormRef = useRef();
    const blogs = useSelector(state => state.blogs)
    useEffect(() => {
        getBlogs();
    }, []);

    const createNewBlog = async (newBlog) => {
        blogFormRef.current.toggleVisibility();
        dispatch(AddNewBlog(newBlog))
        dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 5000));
        getBlogs();
        
      };
    
    if(!blogs){
        return (
            <div>loading...</div>
        )
    }
    return (
        <>
            <Togglable buttonLabel={"Create new Blog"} ref={blogFormRef}>
                <NewBlogForm
                setNotification={setNotification}
                createNewBlog={createNewBlog}
                />
            </Togglable>
            <Table striped>
                <tbody>
                {blogs.map((blog) => (
                    <tr key={blog.id}>
                        <td>
                        <Link to={`/blogs/${blog.id}`}>
                            {blog.title}
                        </Link>
                        </td>
                        <td>
                        {blog.author}
                        </td>
                    </tr>
                ))}
            </tbody>
            </Table>
        </>
    )
    
}