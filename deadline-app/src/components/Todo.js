import React from 'react';

const Todo = ({ todo, todos, deleteHandler, completeHandler, editHandler }) => {
  const removeItem = () => {
    // Filtering happens now in App.js as TodoComponent now has only
    // todos from certain list
    deleteHandler(todo.id);
  };

  const markCompleted = (e) => {
    if (todo.isdone !== true) {
      // Filtering happens now in App.js as TodoComponent now has only
      // todos from certain list
      completeHandler(todo.id);
    }
    return;
  };

  const handleEdit = () => {
    editHandler(todo);
  };

  const setClassNameDependingOnIsDoneStatus = () => {
    return todo.isdone ? 'todo-item completed' : 'todo-item';
  };

  return (
    <li className={setClassNameDependingOnIsDoneStatus()}>
      <p>{todo.priority}</p>
      <p>{todo.date}</p>
      <p>{todo.name}</p>
      <CustomButton
        className='btn-flat task-completed'
        onClick={markCompleted}
        icon='fas fa-check'
      />
      <CustomButton
        className='btn-flat'
        onClick={handleEdit}
        icon='fas fa-edit'
      />
      <CustomButton
        className='btn-flat'
        onClick={removeItem}
        icon='fas fa-trash'
      />
    </li>
  );
};

// Change later to a more permanent solution
function CustomButton(props) {
  return (
    <button className={props.className} onClick={props.onClick}>
      <i className={props.icon}></i>
    </button>
  );
}

export default Todo;
