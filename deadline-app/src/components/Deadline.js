import React from 'react';
// Import components
import Todo from './Todo';

const TodoList = ({ deadlines, todoHandler, collapsibleStates }) => {
  const deadlineItems = deadlines.map((todo) => {
    return (
      <Todo
        key={todo.id}
        todo={todo}
        todoHandler={todoHandler}
        collapsibleStates={collapsibleStates}
      />
    );
  });
  return <div>{deadlineItems}</div>;
};

export default TodoList;
