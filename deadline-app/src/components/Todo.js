import React, { useState } from 'react';

const Todo = ({ todo, todos, deleteHandler, completeHandler }) => {
  // const [className, setClassName] = useState('todo-item');
  const removeItem = () => {
    deleteHandler(
      todos.filter((el) => {
        return el.id !== todo.id;
      })
    );
  };

  const markCompleted = (e) => {
    if (todo.isdone !== true) {
      // setClassName('todo-item completed');
      completeHandler(todos.findIndex((el) => el.id === todo.id));
    }
    return;
  };

  const setClassNameDependingOnIsDoneStatus = () => {
    return todo.isdone ? 'todo-item completed' : 'todo-item';
  };

  return (
    <li className={setClassNameDependingOnIsDoneStatus()}>
      <p>{todo.priority}</p>
      <p>{todo.date}</p>
      <p>{todo.name}</p>
      <button onClick={markCompleted} className='btn-flat task-completed'>
        <i className='fas fa-check'></i>
      </button>
      <EditButton />
      <button onClick={removeItem} className='btn-flat'>
        <i className='fas fa-trash'></i>
      </button>
    </li>
  );
};

// Change later to a more permanent solution
function EditButton(props) {
  return (
    <button className='btn-flat'>
      <i className='fas fa-edit'></i>
    </button>
  );
}

export default Todo;
