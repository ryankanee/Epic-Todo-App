import ToDoHeader from "./todoHeader";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function Login({ needsAccount }) {
  const { login } = useAuth();
  const [allUsers] = useState(
    () => JSON.parse(localStorage.getItem("Users")) || [],
  );

  const [usernameAlert, setUsernameAlert] = useState(false);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (event) => {
    setUser(event.target.value);
  };

  const handlePasswordInputChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.trim() && password.trim()) {
      if (!checkLogin(user.trim(), password.trim())) {
        setUsernameAlert(true);
        return;
      }
      login(user.trim());
    }
  };

  const checkLogin = (username, password) => {
    for (let i = 0; i < allUsers.length; i++) {
      if (
        allUsers[i].username === username &&
        allUsers[i].password === password
      ) {
        return true;
      }
    }

    return false;
  };

  const handleAccount = (event) => {
    event.preventDefault();
    needsAccount();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="login-form">
        <ToDoHeader />
        <h2>Login In</h2>
        {usernameAlert ? (
          <p className="username-alert">Username/Password Not Found</p>
        ) : null}
        <input
          type="text"
          placeholder="Username"
          value={user}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={handlePasswordInputChange}
        />
        <button type="submit">Login</button>
        <div className="user-group">
          <p className="user">Need an Account?</p>
          <button onClick={handleAccount} className="logout-button">
            Create Account
          </button>
        </div>
      </form>
    </>
  );
}

export default Login;
