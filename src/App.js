import "./App.css";
import TodoList from "./components/todoList";
import Auth from "./components/Auth";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

function AppContent() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="App">
      {isLoggedIn ? <TodoList /> : <Auth />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
