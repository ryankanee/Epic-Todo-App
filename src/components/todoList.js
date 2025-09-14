import { useEffect, useState } from "react";
import ToDoHeader from "./todoHeader";
import { useAuth } from "../contexts/AuthContext";

function TodoList() {
  const { currentUser, logout } = useAuth();
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem(currentUser || "default");
    return stored ? JSON.parse(stored) : [];
  });
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const storageKey = currentUser || "default";
    const stored = localStorage.getItem(storageKey);
    setTasks(stored ? JSON.parse(stored) : []);
  }, [currentUser]);

  useEffect(() => {
    const storageKey = currentUser || "default";
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [currentUser, tasks]);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = (event) => {
    event.preventDefault();
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    const updatedArray = tasks.filter((_, i) => i !== index);
    setTasks(updatedArray);
  };

  const moveTaskUp = (index) => {
    if (index > 0) {
      const updatedArray = [...tasks];
      [updatedArray[index], updatedArray[index - 1]] = [
        updatedArray[index - 1],
        updatedArray[index],
      ];
      setTasks(updatedArray);
    }
  };

  const moveTaskDown = (index) => {
    if (index < tasks.length - 1) {
      const updatedArray = [...tasks];
      [updatedArray[index], updatedArray[index + 1]] = [
        updatedArray[index + 1],
        updatedArray[index],
      ];
      setTasks(updatedArray);
    }
  };

  return (
    <>
      <div className="user-group">
        <p className="user">Welcome {currentUser}</p>
        <button onClick={logout} className="logout-button">
          Logout
        </button>
      </div>
      <div className="todo-list">
        <ToDoHeader/>
        <form onSubmit={addTask}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Add a task..."
              value={newTask}
              onChange={handleInputChange}
            />
            <button type="submit" className="add-button">
              Add
            </button>
          </div>
        </form>

        <ol>
          {tasks.map((task, index) => (
            <li key={index}>
              <span className="text">{task}</span>
              <button
                className="delete-button"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
              <button className="move-button" onClick={() => moveTaskUp(index)}>
                ⬆️
              </button>
              <button
                className="move-button"
                onClick={() => moveTaskDown(index)}
              >
                ⬇️
              </button>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default TodoList;
