import React from 'react';
// Import components
import Todo from './Todo';

const TodoList = ({ todos, todoHandler, collapsibleStates }) => {
  const todoItems = todos.map((todo) => {
    return (
      <Todo
        key={todo.id}
        todo={todo}
        todoHandler={todoHandler}
        collapsibleStates={collapsibleStates}
      />
    );
  });
  return <div className='list'>{todoItems}</div>;
};

export default TodoList;
