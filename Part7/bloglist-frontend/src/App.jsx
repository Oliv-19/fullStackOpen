import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginServices from "./services/login";
import Togglable from "./components/Togglable";
import NewBlogForm from "./components/NewBlogForm";
import LoginForm from "./components/LoginForm";
import {setNotification} from "./reducers/notificationReducer";
import { useDispatch, useSelector} from "react-redux";
import { AddNewBlog, getAllBlogs } from "./reducers/BlogsReducer";

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const blogFormRef = useRef();

  const dispatch = useDispatch()
  const notification = useSelector(state => state.notifications)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  const getBlogs = async () => {
    dispatch(getAllBlogs())
 
  };
  useEffect(() => {
    getBlogs();
   
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginServices.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);  
      
      dispatch(setNotification(`User '${user.username}' logged in`, 5000))
      setUser(user);
      setUsername("");
      setPassword("");
    } catch {
      console.error("Wrong credentials");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    dispatch(setNotification(`User logged out`, 5000))
    setUser(null);
    setUsername("");
    setPassword("");
  };

  const showNotification = () => {
    return (
      <div
        style={{
          border: `1px solid ${notification.error ? "red" : "green"}`,
          color: `${notification.error ? "red" : "green"}`,
        }}
      >
        {notification.message}
      </div>
    );
  };
  const createNewBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();
    dispatch(AddNewBlog(newBlog))
    dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 5000));
    getBlogs();
    
  };

  const handleLikes = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    await blogService.update(updatedBlog);
    getBlogs();
  };
  const handleDeleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.destroy(blog);
      getBlogs();
    }
  };

  if (user === null) {
    return (
      <>
        {notification.message && showNotification()}
        <LoginForm
          handleLogin={handleLogin}
          setPassword={setPassword}
          setUsername={setUsername}
          />
      </>
    );
  }

  return (
    <div>
      {notification.message && showNotification()}
      <h2>blogs</h2>
      <h4>
        {user.username} logged in
        <button onClick={handleLogout}>log out</button>
      </h4>
      <Togglable buttonLabel={"Create new Blog"} ref={blogFormRef}>
        <NewBlogForm
          setNotification={setNotification}
          createNewBlog={createNewBlog}
        />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          isUserBlog={user.username === blog.user.username}
          handleLikes={handleLikes}
          handleDeleteBlog={handleDeleteBlog}
        />
      ))}
    </div>
  );
};

export default App;
