import React from 'react';
// Import components
import TodoList from './Todolist';

const ListComponent = ({
  todos,
  deleteHandler,
  completeHandler,
  editHandler,
}) => {
  const list = [];
  todos.forEach((todo) => {
    if (!list.includes(todo.list)) {
      list.push(todo.list);
    }
  });
  console.log(list);

  const jep = list.map((listItem) => {
    const x = todos.filter((todo) => todo.list === listItem);
    console.log(x);
    console.log(todos);
    return (
      <ul>
        <h3>{listItem}</h3>
        <TodoList
          todos={x}
          deleteHandler={deleteHandler}
          completeHandler={completeHandler}
          editHandler={editHandler}
        />
      </ul>
    );
  });

  return <div className='list'>{jep}</div>;
};

export default ListComponent;
