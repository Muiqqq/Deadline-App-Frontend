import React, { useState } from 'react';
import './scss/Main.scss';
// Import components
import TodoForm from './components/TodoForm';
import TodoList from './components/Todolist';

function App() {
  const [inputName, setInputName] = useState('');
  return (
    <div className='app'>
      <div className='form'>
        <TodoForm />
      </div>
      <TodoList />
    </div>
  );
}

export default App;
