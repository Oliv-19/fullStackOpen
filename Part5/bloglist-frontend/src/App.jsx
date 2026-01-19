import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginServices from './services/login'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState({message: '', error: false})
  const blogFormRef = useRef()
  
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const getBlogs = async() =>{
    const allBlogs = await blogService.getAll()
    allBlogs.sort((a, b) => a.likes + b.likes)
    setBlogs( allBlogs )
  }

  useEffect(() => {
      getBlogs()
  }, [])
  
  const handleLogin = async(e) => {
    e.preventDefault()
    try {

      const user = await loginServices.login({username, password})
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      console.error('Wrong credentials');
      
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setUsername('')
    setPassword('')
    
  }

  const showNotification = () => {
    setTimeout(() => {
      setNotification({message:'', error: false})
    }, 5000)
    return (
       <div style={{border: `1px solid ${notification.error? 'red': 'green'}`,
       color:`${notification.error? 'red': 'green'}`}}>
          {notification.message}
        </div>
    )
  }
  const createNewBlog = async(newBlog) =>{
    blogFormRef.current.toggleVisibility()
    await blogService.create(newBlog)
    setNotification({message: `a new blog ${newBlog.title} by ${newBlog.author} added`, error:false})
    getBlogs()
  }
  const handleLikes = async(blog) => {
    const updatedBlog = {...blog, likes: blog.likes+1}
    await blogService.update(updatedBlog)
    getBlogs()

  }

  if(user === null){
    return <LoginForm handleLogin={handleLogin} setPassword={setPassword} setUsername={setUsername} />
  } 

  return (
    <div>
      <h2>blogs</h2>
      {notification.message && showNotification()}
      <h4>
        {user.username} logged in
        <button onClick={handleLogout}>log out</button>
      </h4>
      <Togglable buttonLabel={'Create new Blog'} ref={blogFormRef}>
        <NewBlogForm setNotification= {setNotification} createNewBlog={createNewBlog}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLikes ={handleLikes}/>
      )}
    </div>
  )
}

export default App