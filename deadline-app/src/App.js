import React from 'react';
import './scss/Main.scss';
// Import components
import TodoForm from './components/TodoForm';
import ListComponent from './components/ListComponent';
import SortComponent from './components/SortComponent';

const todoFormButtonLabel = {
  ADD: 'Add',
  EDIT: 'Edit',
};

// Todo:
// Cleanup
// Rename a bunch of functions and variables for clarity?
// Start extracting components where necessary, again for clarity.
// Move component specific functions under objects?
//    App is becoming cluttered, not to mention passing props
//    to child components.

// NOTE! todoFormState now generates random id for added items for
// item removal to work.
// Refactor this when using database.
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

  // Filtering happens here where we have access to whole list
  // of todos
  deleteHandler = (todoId) => {
    const temp = this.state.todos.filter((el) => {
      console.log(el);
      return el.id !== todoId;
    });
    this.setState({
      todos: temp,
    });
  };

  // Filtering happens here where we have access to whole list
  // of todos
  // NOTE: unmarking marked todos doesn't work for some reason
  completeHandler = (todoId) => {
    console.log(todoId);
    const temp = [...this.state.todos];
    let idx = temp.findIndex((x) => x.id === todoId);
    temp[idx] = {
      ...temp[idx],
      isdone: !temp[idx].isdone,
    };
    console.log(temp);
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
            <ListComponent
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
