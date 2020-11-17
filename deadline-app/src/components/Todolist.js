import React from 'react';
// Import components
import Todo from './Todo';

const TodoList = ({ todos, deleteHandler }) => {
  const todoItems = todos.map((todo, index) => {
    return (
      <Todo
        key={index}
        todo={todo}
        todos={todos}
        deleteHandler={deleteHandler}
      />
    );
  });
  return (
    <div className='list'>
      <ul>{todoItems}</ul>
    </div>
  );
};

export default TodoList;
