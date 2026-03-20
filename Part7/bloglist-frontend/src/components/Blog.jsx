import { useState } from "react";
const Blog = ({ blog, isUserBlog, handleLikes, handleDeleteBlog }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isVisible = () => {
    setIsOpen(!isOpen);
  };
  let styles = {
    border: "1px solid black",
    width: "fit-content",
    padding: "5px",
    margin: "5",
  };
  return (
    <div className="blog" id={blog.title.split(" ").join("-")} style={styles}>
      {isOpen ? (
        <>
          <p>
            {blog.title} <button onClick={isVisible}>hide</button>
          </p>
          <p>{blog.url}</p>
          <p className="likes">
            likes {blog.likes}{" "}
            <button data-testid="likeBtn" onClick={()=> handleLikes(blog)}>
              like
            </button>
          </p>
          <p>{blog.author}</p>
          {isUserBlog === true && <button onClick={()=> handleDeleteBlog(blog)}>Remove</button>}
        </>
      ) : (
        <>
          {blog.title} {blog.author}{" "}
          <button data-testid="viewBtn" onClick={isVisible}>
            view
          </button>
        </>
      )}
    </div>
  );
};

export default Blog;
