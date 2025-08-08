// import './App.css'
// import TodoList from './TodoList'

// function App() {


//   return (
//     <>
//     <TodoList/>
//       </>
//   )
// }

// export default App
// App.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  // States
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editId, setEditId] = useState(null);
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [filter, setFilter] = useState('all');

  // Load todos from localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) setTodos(JSON.parse(savedTodos));
  }, []);

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Filter todos based on selected filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    if (filter === 'high') return todo.priority === 'high';
    if (filter === 'medium') return todo.priority === 'medium';
    if (filter === 'low') return todo.priority === 'low';
    return true;
  });

  // CRUD Operations
  const addTodo = () => {
    if (inputValue.trim()) {
      if (editId !== null) {
        setTodos(todos.map(todo => 
          todo.id === editId ? { 
            ...todo, 
            text: inputValue,
            priority,
            dueDate 
          } : todo
        ));
        setEditId(null);
      } else {
        setTodos([...todos, {
          id: Date.now(),
          text: inputValue,
          completed: false,
          priority,
          dueDate,
          createdAt: new Date().toISOString()
        }]);
      }
      setInputValue('');
      setPriority('medium');
      setDueDate('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const startEdit = (todo) => {
    setInputValue(todo.text);
    setPriority(todo.priority);
    setDueDate(todo.dueDate || '');
    setEditId(todo.id);
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <div className="app">
      <h1>Advanced To-Do List</h1>
      
      {/* Add Task Form */}
      <div className="todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        
        <select 
          value={priority} 
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="date-input"
        />
        
        <button onClick={addTodo}>
          {editId !== null ? 'Update' : 'Add'}
        </button>
      </div>
      
      {/* Filter Options */}
      <div className="filter-options">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('high')}>High Priority</button>
        <button onClick={() => setFilter('medium')}>Medium Priority</button>
        <button onClick={() => setFilter('low')}>Low Priority</button>
        <button onClick={clearCompleted} className="clear-btn">Clear Completed</button>
      </div>
      
      {/* Todo List */}
      <div className="todo-list">
        <AnimatePresence>
          {filteredTodos.map(todo => (
            <motion.div
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''} ${todo.priority}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
              
              <div className="todo-content">
                <span className="todo-text">{todo.text}</span>
                {todo.dueDate && (
                  <span className="due-date">
                    Due: {new Date(todo.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
              
              <div className="todo-actions">
                <button onClick={() => startEdit(todo)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;