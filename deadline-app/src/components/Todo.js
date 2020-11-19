import React from 'react';
import Collapsible from './Collapsible';

const Todo = ({ todo, todos, deleteHandler, completeHandler, editHandler }) => {
  const removeItem = () => {
    // Filtering happens now in App.js as TodoComponent now has only
    // todos from certain list
    deleteHandler(todo.id);
  };

  const markCompleted = (e) => {
    // Prevents task from collapsing when clicking the checkmark button.
    e.stopPropagation();

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
      <Collapsible
        closeOnChangeOf={todos}
        header={
          <>
            <p className='todo-priority'>{todo.priority}</p>
            <p className='todo-date'>{todo.date}</p>
            <p className='todo-name'>{todo.name}</p>
            <CustomButton
              className='btn-flat task-completed'
              onClick={markCompleted}
              icon='fas fa-check'
            />
          </>
        }
      >
        <p className='todo-description'>{todo.description}</p>
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
      </Collapsible>
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
