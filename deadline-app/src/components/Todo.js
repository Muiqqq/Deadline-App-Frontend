import React from 'react';
import Collapsible from './Collapsible';

const Todo = ({
  todo,
  todos,
  deleteHandler,
  completeHandler,
  editHandler,
  collapseHandler,
}) => {
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
        onClick={collapseHandler}
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
        <div className='toolbar'>
          <p>This needs serious work</p>
          <CustomButton
            id='edit'
            className='btn py-05'
            onClick={handleEdit}
            label='Edit'
            icon='fas fa-edit'
          />
          <CustomButton
            id='delete'
            className='btn py-05'
            onClick={removeItem}
            label='Delete'
            icon='fas fa-trash'
          />
        </div>
        <div>
          <p>Description:</p>
          <p className='todo-description'>{todo.description}</p>
        </div>
      </Collapsible>
    </li>
  );
};

// Change later to a more permanent solution
function CustomButton(props) {
  return (
    <button id={props.id} className={props.className} onClick={props.onClick}>
      {props.label}
      <i className={props.icon}></i>
    </button>
  );
}

export default Todo;
