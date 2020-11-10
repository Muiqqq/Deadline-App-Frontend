import React, { useState } from 'react';

// Import components
import Todo from './Todo';

const TodoList = () => {
  return (
    <div className='list-container'>
      <ul>
        <Todo />
      </ul>
    </div>
  );
};

export default TodoList;
