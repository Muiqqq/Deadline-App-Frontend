import React from 'react';
import './scss/Main.scss';
// Import components
import TodoForm from './components/TodoForm';
import TodoList from './components/Todolist';
import SortComponent from './components/SortComponent';

const todoFormButtonLabel = {
  ADD: 'Add',
  EDIT: 'Edit',
};

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
      todoFormSubmitButtonLabel: todoFormButtonLabel.ADD,
    };
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
    let temp = [...this.state.todos];
    if (this.state.todoFormSubmitButtonLabel === todoFormButtonLabel.EDIT) {
      const indexOfEditedTodo = temp.findIndex(
        (element) => element.id === todo.id
      );
      temp[indexOfEditedTodo] = todo;
    } else {
      temp = temp.concat(todo);
    }
    this.setState({
      todos: temp,
      todoFormState: this.resetTodoFormState(),
      todoFormSubmitButtonLabel: todoFormButtonLabel.ADD,
    });
  };

  handleCancel = () => {
    this.setState({
      todoFormState: this.resetTodoFormState(),
      todoFormSubmitButtonLabel: todoFormButtonLabel.ADD,
    });
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
    this.setState({
      todoFormState: todoToEdit,
      todoFormSubmitButtonLabel: todoFormButtonLabel.EDIT,
    });
  };

  render() {
    return (
      <div className='container'>
        <div className='app'>
          <div className='form'>
            <TodoForm
              submitButtonLabel={this.state.todoFormSubmitButtonLabel}
              todoFormState={this.state.todoFormState}
              onInputChange={this.handleTodoFormInputChange}
              onFormSubmit={this.handleSubmit}
              onFormCancel={this.handleCancel}
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
