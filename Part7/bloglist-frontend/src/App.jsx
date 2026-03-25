import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import {setNotification} from "./reducers/notificationReducer";
import { useDispatch, useSelector} from "react-redux";
import { deleteBlog, getAllBlogs, likeBlog } from "./reducers/BlogsReducer";
import { logout, saveUser } from "./reducers/UserReducer";
import { Routes, Route, useNavigate} from "react-router-dom";
import { Users } from "./components/Users";
import { User } from "./components/User";
import { Blogs } from "./components/Blogs";
import { Nav } from "./components/Nav";
const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  const notification = useSelector(state => state.notifications)
  const user = useSelector(state => state.user)
  const navigate= useNavigate()

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch(saveUser(user))
    }else{
      navigate('/login')
    }
  }, []);
  const getBlogs = async () => {
    dispatch(getAllBlogs())
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    dispatch(setNotification(`User logged out`, 5000))
    dispatch(logout(null))
    setUsername("");
    setPassword("");
    navigate('/login')
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

  const handleLikes = async (blog) => {
    dispatch(likeBlog(blog))
  };
  const handleDeleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
    }
  };
  useEffect(()=> {
    if(user){
      navigate('/')
    }
  }, [user])
  
  return (
    <div className="container">
      <Nav handleLogout={handleLogout}></Nav>
      {notification.message && showNotification()}
        
      <Routes>
        <Route path="/" element={<Blogs getBlogs={getBlogs}></Blogs>}></Route>
        <Route path="/login" element={
          <LoginForm password={{password,setPassword}} username={{username, setUsername}}/>
          }>
        </Route>
        <Route path='/blogs/:id' element={
          <Blog 
            handleLikes={handleLikes}
            handleDeleteBlog={handleDeleteBlog}
            getBlogs={getBlogs}
            >
          </Blog>}>
        </Route>
        <Route path='/users' element={<Users></Users>}></Route>
        <Route path='/users/:id' element={<User></User>}></Route>
      </Routes>
    </div>
  );
};

export default App;
