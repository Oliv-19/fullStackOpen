import loginServices from "../services/login";
import blogService from "../services/blogs";
import { saveUser } from "../reducers/UserReducer";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { Button, Form } from "react-bootstrap";

const LoginForm = ({password, username}) => {
  const dispatch = useDispatch()
  const handleChange = (e) => {
    if (e.target.id === "usernameInput") {
      username.setUsername(e.target.value);
    } else if (e.target.id === "passwordInput") {
      password.setPassword(e.target.value);
    }
  };
  const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const user = await loginServices.login({ username: username.username, password: password.password });
        window.localStorage.setItem("loggedUser", JSON.stringify(user));
        blogService.setToken(user.token);
        
        dispatch(setNotification(`User '${user.username}' logged in`, 5000))
        dispatch(saveUser(user));
        username.setUsername("");
        password.setPassword("");
      } catch {
        console.error("Wrong credentials");
      }
    };
  return (
    <div>
      <h1>Log in to application</h1>
      <Form action="" onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            id="usernameInput"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            id="passwordInput"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          login
        </Button>
      </Form>
    </div>
  );
};
export default LoginForm;
