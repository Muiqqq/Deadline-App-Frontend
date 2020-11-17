import React, { useState } from 'react';

const Todo = ({ todo, todos, deleteHandler, completeHandler }) => {
  const [className, setClassName] = useState('todo-item');
  const removeItem = () => {
    deleteHandler(
      todos.filter((el) => {
        return el.id !== todo.id;
      })
    );
  };

  const markCompleted = (e) => {
    setClassName('todo-item completed');
    completeHandler(todos.findIndex((el) => el.id === todo.id));
  };

  return (
    <li className={className}>
      <p>{todo.priority}</p>
      <p>{todo.date}</p>
      <p>{todo.name}</p>
      <button onClick={markCompleted} className='btn-flat task-completed'>
        <i className='fas fa-check'></i>
      </button>
      <button onClick={removeItem} className='btn-flat'>
        <i className='fas fa-trash'></i>
      </button>
    </li>
  );
};

export default Todo;
