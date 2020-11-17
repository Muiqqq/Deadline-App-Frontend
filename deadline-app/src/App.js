import React from 'react';
import './scss/Main.scss';
// Import components
import TodoForm from './components/TodoForm';
import TodoList from './components/Todolist';
import SortComponent from './components/SortComponent';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (todo) => {
    // Changes
    const temp = [...this.state.todos];
    temp.push(todo);
    // End of changes
    this.setState({ todos: temp });
  };

  handleSort = (sortedTodos) => {
    this.setState({ todos: sortedTodos });
  };

  deleteHandler = (filtered) => {
    this.setState({
      todos: filtered,
    });
  };

  completeHandler = (elementIndex) => {
    console.log(elementIndex);
    const temp = [...this.state.todos];
    temp[elementIndex] = {
      ...temp[elementIndex],
      isdone: !temp[elementIndex].isdone,
    };
    this.setState({
      todos: temp,
    });
  };

  render() {
    return (
      <div className='container'>
        <div className='app'>
          <div className='form'>
            <TodoForm onFormSubmit={this.handleSubmit} />
          </div>
          <div className='todo-list'>
            <SortComponent
              tasklist={this.state.todos}
              updateTasklist={this.handleSort}
            />
            <TodoList
              todos={this.state.todos}
              deleteHandler={this.deleteHandler}
              completeHandler={this.completeHandler}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
