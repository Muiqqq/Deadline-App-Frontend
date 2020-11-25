import React from 'react';
// Import components
import TodoList from './Todolist';

const ListComponent = ({ todos, todoHandler, collapsibleStates }) => {
  const list = [];
  todos.forEach((todo) => {
    if (!list.includes(todo.list)) {
      list.push(todo.list);
    }
  });

  const generateLists = list.map((listItem) => {
    const filtered = todos.filter((todo) => todo.list === listItem);
    return (
      <ul>
        <h3>{listItem}</h3>
        <TodoList
          todos={filtered}
          todoHandler={todoHandler}
          collapsibleStates={collapsibleStates}
        />
      </ul>
    );
  });

  return <div className='list'>{generateLists}</div>;
};

export default ListComponent;
