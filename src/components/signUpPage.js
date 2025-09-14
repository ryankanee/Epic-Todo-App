import { useEffect, useState } from "react";
import ToDoHeader from "./todoHeader";
import { useAuth } from "../contexts/AuthContext";

function SignUp({ hasAccount }) {
  const { login } = useAuth();
  const [allUsers, setAllUsers] = useState(
    () => JSON.parse(localStorage.getItem("Users")) || [],
  );

  const [usernameAlert, setUsernameAlert] = useState(false);

  useEffect(() => {
    localStorage.setItem("Users", JSON.stringify(allUsers));
  }, [allUsers]);
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
      if (checkUsernameTaken(user.trim())) {
        setUsernameAlert(true);
        return;
      }

      const newUser = { username: user.trim(), password: password.trim() };
      const updatedUsers = [...allUsers, newUser];

      // Save to localStorage immediately before state update
      localStorage.setItem("Users", JSON.stringify(updatedUsers));

      setAllUsers(updatedUsers);
      setUser("");
      setPassword("");
      login(user.trim());
    }
  };

  const checkUsernameTaken = (username) => {
    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].username === username) {
        return true;
      }
    }

    return false;
  };

  const handleAccount = (event) => {
    event.preventDefault();

    hasAccount();
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="login-form">
        <ToDoHeader />
        <h2>Create Account</h2>
        {usernameAlert ? (
          <p className="username-alert">Username Already Taken</p>
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
        <button type="submit">Sign Up</button>

        <div className="user-group">
          <p className="user">Have an Account?</p>
          <button onClick={handleAccount} className="logout-button">
            Login
          </button>
        </div>
      </form>
    </>
  );
}

export default SignUp;
