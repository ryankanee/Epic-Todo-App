import { useState } from "react";
import "./App.css";
import TodoList from "./components/todoList";
import Auth from "./components/Auth";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggin, setLogin] = useState(false);

  const handleLogin = (username) => {
    setCurrentUser(username);
    setLogin(true);
  };

  const handleLogout = () => {
    setLogin(false);
  };

  return (
    <div className="App">
      {isLoggin ? (
        <TodoList currentUser={currentUser} onLogout={handleLogout} />
      ) : (
        <Auth onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
