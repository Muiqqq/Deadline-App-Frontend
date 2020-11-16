import React from 'react';

const Todo = ({ todo }) => {
  const deleteHandler = () => {};
  return (
    <li className='todo-item'>
      <p>{todo[2]}</p>
      <p>{todo[1]}</p>
      <p>{todo[0]}</p>
      <button onClick={deleteHandler}>
        <i class='fas fa-trash'></i>
      </button>
    </li>
  );
};

export default Todo;
