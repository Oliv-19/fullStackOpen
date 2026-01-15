import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginServices from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async(e) => {
    e.preventDefault()
    try {

      const user = await loginServices.login({username, password})
      console.log(user)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      console.error('Wrong credentials');
      
    }
  }
  const handleChange = (e) => {
    if(e.target.id == 'usernameInput'){
      setUsername(e.target.value)
    }else if( e.target.id == 'passwordInput'){
      setPassword(e.target.value)
    }
  }

  if(user === null){
    return (
      <div>
          <h1>Log in to application</h1>
          <form action="" onSubmit={handleLogin}>
            <label >
              Username
              <input onChange={handleChange} id='usernameInput' type="text" />
            </label>
            <label >
              Password
              <input onChange={handleChange} id='passwordInput' type="password" />
            </label>
            <button type="submit">log in</button>
          </form>
      </div>
    )
  } 

  return (
    <div>
      <h2>blogs</h2>
      <h4>{user.username} has logged in</h4>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App