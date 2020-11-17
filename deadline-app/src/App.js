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
      todoFormState: {
        name: '',
        date: '',
        priority: '',
        list: '',
        descritpion: '',
        isdone: false,
        id: Math.random() * 1000,
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTodoFormInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let todoFormState = { ...this.state.todoFormState };
    todoFormState[name] = value;
    this.setState({
      todoFormState: todoFormState,
    });
  };

  handleSubmit = (todo) => {
    // Changes
    const temp = [...this.state.todos];
    temp.push(todo);
    // End of changes
    this.setState({ todos: temp, todoFormState: this.resetTodoFormState() });
  };

  resetTodoFormState = () => {
    let todoformstate = { ...this.state.todoFormState };
    todoformstate.name = '';
    todoformstate.date = '';
    todoformstate.priority = '';
    todoformstate.list = '';
    todoformstate.description = '';
    todoformstate.isdone = false;
    todoformstate.id = Math.random() * 1000;
    return todoformstate;
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

  editHandler = (todoToEdit) => {
    this.setState({ todoFormState: todoToEdit });
  };

  render() {
    return (
      <div className='container'>
        <div className='app'>
          <div className='form'>
            <TodoForm
              todoFormState={this.state.todoFormState}
              onInputChange={this.handleTodoFormInputChange}
              onFormSubmit={this.handleSubmit}
            />
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
              editHandler={this.editHandler}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
