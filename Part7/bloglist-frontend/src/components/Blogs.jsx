import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const Blogs = ({getBlogs}) => {

  const blogs = useSelector(state => state.blogs)
    useEffect(() => {
        getBlogs();
    }, []);
    
    if(!blogs){
        return (
            <div>loading...</div>
        )
    }
    return (
        <div>
            {blogs.map((blog) => (
                <div key={blog.id}  style={{border:'black 1px solid', width:'90%'}}>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </div>
            
            ))}
        </div>
    )
    
}