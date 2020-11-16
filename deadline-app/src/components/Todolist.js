import React from 'react';
// Import components
import Todo from './Todo';

const TodoList = (props) => {
  const todoItems = props.todos.map((todo, index) => {
    return <Todo key={index} todo={todo.name} />;
  });
  return (
    <div className='list'>
      <ul>{todoItems}</ul>
    </div>
  );
};

export default TodoList;
