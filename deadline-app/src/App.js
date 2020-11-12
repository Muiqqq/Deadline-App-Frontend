import React, { useState } from "react";
import "./scss/Main.scss";
// Import components
import TodoForm from "./components/TodoForm";
import TodoList from "./components/Todolist";

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
    console.log(this.state.todos);
  };

  render() {
    return (
      <div className="container">
        <div className="app">
          <div className="form">
            <TodoForm onFormSubmit={this.handleSubmit} />
          </div>
          <div className="todo-list">
            <TodoList todos={this.state.todos} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
