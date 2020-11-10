import React from 'react';
import './scss/Main.scss';
// Import components
import Form from './components/Form';
import TodoList from './components/Todolist';
import Todo from './components/Todo';

function App() {
  return (
    <div className='form'>
      <Form />;
    </div>
  );
}

export default App;
