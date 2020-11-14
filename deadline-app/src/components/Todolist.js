import React from 'react';
// Import components
import Todo from './Todo';

const TodoList = ({ todos }) => {
  const todoItem = todos.map((todo, index) => {
    return <Todo key={index} todo={todo.name} />;
  });
  return <div>{todoItem}</div>;
};

export default TodoList;
