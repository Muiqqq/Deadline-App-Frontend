import React from 'react';

const Todo = ({ todo, todos, deleteHandler, completeHandler, editHandler }) => {
  const removeItem = () => {
    deleteHandler(
      todos.filter((el) => {
        return el.id !== todo.id;
      })
    );
  };

  const markCompleted = (e) => {
    if (todo.isdone !== true) {
      completeHandler(todos.findIndex((el) => el.id === todo.id));
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
      <button onClick={markCompleted} className='btn-flat task-completed'>
        <i className='fas fa-check'></i>
      </button>
      <EditButton onClick={handleEdit} />
      <button onClick={removeItem} className='btn-flat'>
        <i className='fas fa-trash'></i>
      </button>
    </li>
  );
};

// Change later to a more permanent solution
function EditButton(props) {
  return (
    <button className='btn-flat' onClick={props.onClick}>
      <i className='fas fa-edit'></i>
    </button>
  );
}

export default Todo;
