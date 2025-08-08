import { useState } from "react";
import "./TodoList.css";

export default function TodoList() {
  const [todos, setTodos] = useState(["Sample Task"]);
  const [newTodo, setNewTodo] = useState("");

  const addNewTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, newTodo.trim()]);
      setNewTodo("");
    }
  };

  const deleteTodo = (indexToDelete) => {
    setTodos(todos.filter((_, index) => index !== indexToDelete));
  };

  const clearAll = () => {
    setTodos([]);
  };

  return (
    <div className="todo-container">
      <h2>📝 My Todo List</h2>
      <div className="input-section">
        <input
          type="text"
          placeholder="Add a task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addNewTodo}>Add</button>
        <button className="clear-btn" onClick={clearAll}>Clear All</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index}>
            <span>{todo}</span>
            <button className="delete-btn" onClick={() => deleteTodo(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
