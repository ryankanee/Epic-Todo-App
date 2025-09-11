import { useEffect, useState } from "react";

function LogIn({ onLogin }) {
  const [allUsers, setAllUsers] = useState(
    () => JSON.parse(localStorage.getItem("Users")) || [],
  );

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
      const newUser = { username: user.trim(), password: password.trim() };
      setAllUsers([...allUsers, newUser]);
      onLogin(user.trim());
      setUser("");
      setPassword("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h1>Todo List!</h1>

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
      <button type="submit">Log in</button>
    </form>
  );
}

export default LogIn;
