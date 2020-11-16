import React from 'react';
// Import components
import Todo from './Todo';

const toArray = (obj) => Object.values(obj);

const TodoList = (props) => {
  const todoItems = props.todos.map((todo, index) => {
    return <Todo key={index} todo={toArray(todo)} />;
  });
  return (
    <div className='list'>
      <ul>{todoItems}</ul>
    </div>
  );
};

export default TodoList;
