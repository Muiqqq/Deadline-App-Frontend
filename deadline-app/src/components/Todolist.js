import React from 'react';
// Import components
import Todo from './Todo';

const TodoList = ({ todos, deleteHandler, completeHandler, editHandler }) => {
  const todoItems = todos.map((todo, index) => {
    return (
      <Todo
        key={index}
        todo={todo}
        todos={todos}
        deleteHandler={deleteHandler}
        completeHandler={completeHandler}
        editHandler={editHandler}
      />
    );
  });
  return <div className='list'>{todoItems}</div>;
};

export default TodoList;
