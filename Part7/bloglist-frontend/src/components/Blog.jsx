import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addComment } from "../reducers/BlogsReducer";
const Blog = ({ handleLikes, handleDeleteBlog, getBlogs}) => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    getBlogs();
  }, [params.id]);

  const blog = blogs?.find((b) => b.id === params.id)
  const isUserBlog = user.username === blog?.user.username
  
  const comment = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const comment = formData.get('comment')
    console.log(comment);
    dispatch(addComment(blog, comment))
  }
  
  
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
      <form onSubmit={comment} action="">
        <input type="text" name="comment"/>
        <button type="submit">Add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, i) => <li key={i+comment}>{comment}</li>)}

      </ul>
    </>
      
  );
  }
  
};

export default Blog;
