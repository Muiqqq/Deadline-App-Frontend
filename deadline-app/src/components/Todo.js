import React from 'react';

const Todo = ({ todo, todos, deleteHandler }) => {
  const removeItem = () => {
    deleteHandler(
      todos.filter((el) => {
        return el.id !== todo.id;
      })
    );
  };
  return (
    <li className='todo-item'>
      <p>{todo.priority}</p>
      <p>{todo.date}</p>
      <p>{todo.name}</p>
      <button onClick={removeItem}>
        <i className='fas fa-trash'></i>
      </button>
    </li>
  );
};

export default Todo;
