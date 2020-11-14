import React from 'react';
import './scss/Main.scss';
// Import components
import TodoForm from './components/TodoForm';
import TodoList from './components/Todolist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [{ name: 'task 1', date: 'dfs' }, { name: 'task 13' }],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (todo) => {
    const temp = { ...this.state };
    temp.todos.push(todo);
    this.setState({ todos: temp });
    console.log(this.state.todos);
  };

  render() {
    return (
      <div className='app'>
        <div className='form'>
          <TodoForm onFormSubmit={this.handleSubmit} />
        </div>
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
