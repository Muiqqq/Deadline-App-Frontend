import React from 'react';

const Todo = ({ todo, todos, deleteHandler }) => {
  // const removeItem = (e) => {
  //   deleteHandler(item)
  // };
  const removeItem = () => {
    // setTodos(todos.filter((el) => el.id !== todo.id));
    deleteHandler(
      todos.filter((el) => {
        console.log(el.id);
        console.log(todo.id);
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
