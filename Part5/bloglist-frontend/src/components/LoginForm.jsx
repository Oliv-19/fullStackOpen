const LoginForm = ({ setPassword, setUsername, handleLogin }) => {
  const handleChange = (e) => {
    if(e.target.id === 'usernameInput'){
      setUsername(e.target.value)
    }else if( e.target.id === 'passwordInput'){
      setPassword(e.target.value)
    }
  }
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
export default LoginForm