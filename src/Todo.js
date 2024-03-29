import { useState } from 'react';
import './Todo.css';

const Todo = ({ todo, onToggle, onEdit, onDelete }) => {
  return (
    <div>
      <span
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        onClick={() => onToggle(todo.id)}
      >
        {todo.title} - {todo.description}
      </span>
      <button onClick={() => onEdit(todo.id)}>Edit</button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
};

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ id: 0, title: '', description: '', completed: false });
  const [editingId, setEditingId] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const handleToggle = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    if (newTodo.title.trim() === '') {
      errors.title = 'Title is required';
    }
    if (newTodo.description.trim() === '') {
      errors.description = 'Description is required';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    if (editingId !== null) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === editingId ? { ...newTodo, id: editingId } : todo
        )
      );
      setEditingId(null);
    } else {
      setTodos((prevTodos) => [...prevTodos, { ...newTodo, id: Date.now() }]);
    }

    setNewTodo({ id: 0, title: '', description: '', completed: false });
    setValidationErrors({});
  };

  const handleEdit = (id) => {
    // Placeholder for edit functionality
    setEditingId(id);
    // You might want to set newTodo to the values of the todo being edited
  };

  const handleDelete = (id) => {
    // Placeholder for delete functionality
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <h1>Todo List</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={newTodo.title}
            onChange={handleInputChange}
          />
          {validationErrors.title && (
            <span style={{ color: 'red' }}>{validationErrors.title}</span>
          )}
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={newTodo.description}
            onChange={handleInputChange}
          />
          {validationErrors.description && (
            <span style={{ color: 'red' }}>{validationErrors.description}</span>
          )}
        </label>
        <br />
        <button type="submit">
          {editingId !== null ? 'Update Todo' : 'Add Todo'}
        </button>
      </form>
      <h2>Todo Items</h2>
      {todos.length === 0 ? <p>No todos yet. Add some!</p> : null}
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </>
  );
}
