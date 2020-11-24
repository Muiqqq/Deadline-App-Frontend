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
// More styling for collapsible tasks. (buttons etc.)
// Confirmation dialog for delete button?

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
      collapsibleStates: [],
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
    let todos = [...this.state.todos];
    let collapsibleStates = [...this.state.collapsibleStates];
    if (this.state.todoFormSubmitButtonLabel === todoFormButtonLabel.EDIT) {
      const indexOfEditedTodo = todos.findIndex(
        (element) => element.id === todo.id
      );
      todos[indexOfEditedTodo] = todo;
    } else {
      const obj = { id: todo.id, open: false };
      collapsibleStates = collapsibleStates.concat(obj);
      todos = todos.concat(todo);
    }
    this.setState({
      todos: todos,
      todoFormState: this.resetTodoFormState(),
      todoFormSubmitButtonLabel: todoFormButtonLabel.ADD,
      collapsibleStates: collapsibleStates,
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

  collapseHandler = (todoid) => {
    let collapsibleStates = [...this.state.collapsibleStates];
    collapsibleStates.forEach((element) => {
      element.open = todoid === element.id ? !element.open : false;
    });
    this.setState({ collapsibleStates: collapsibleStates });
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
              collapseHandler={this.collapseHandler}
              collapsibleStates={this.state.collapsibleStates}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
