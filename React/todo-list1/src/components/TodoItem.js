import React from 'react';

const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  return (
    <li className={todo.completed ? 'completed' : ''}>
      <input type="checkbox" checked={todo.completed} onChange={handleToggle} />
      <span>{todo.text}</span>
      <button onClick={handleDelete}>Excluir</button>
    </li>
  );
};

export default TodoItem;
