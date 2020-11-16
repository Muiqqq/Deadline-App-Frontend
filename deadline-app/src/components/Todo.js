import React from 'react';

const Todo = ({ todo }) => {
  return (
    <li className='todo-item'>
      <p>{todo[2]}</p>
      <p>{todo[1]}</p>
      <p>{todo[0]}</p>
    </li>
  );
};

export default Todo;
