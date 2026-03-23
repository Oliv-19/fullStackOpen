import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
const Blog = ({ handleLikes, handleDeleteBlog, getBlogs}) => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const params = useParams()

  useEffect(() => {
    getBlogs();
  }, [params.id]);

  const blog = blogs?.find((b) => b.id === params.id)
  const isUserBlog = user.username === blog?.user.username
  if(!blog){
    return (
      <div>Loading...</div>
    )
  } else {
    return (
      <>
      <h1>{blog.title}</h1>
      {isUserBlog === true && <button onClick={()=> handleDeleteBlog(blog)}>Remove</button>}
      <Link to={blog.url}>{blog.url}</Link>
      <p className="likes">
        likes {blog.likes}{" "}
        <button data-testid="likeBtn" onClick={()=> handleLikes(blog)}>
          like
        </button>
      </p>
      <p>added by {blog.author}</p>
      <h4>comments</h4>
      <ul>
        {blog.comments.map((comment) => <li>{comment}</li>)}

      </ul>
    </>
      
  );
  }
  
};

export default Blog;
