import React from "react";
import "./scss/Main.scss";
// Import components
import TodoForm from "./components/TodoForm";
import TodoList from "./components/Todolist";

<<<<<<< HEAD
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
=======
function StateContainer(props) {
  const [tasklist, setTasklist] = useState([
    {
      id: 1,
      name: "B. Milk for the crocs.",
      description: "-",
      date: "2001-09-11",
      priority: 3,
      tasklistname: "TaskListA",
      isdone: false,
    },
    {
      id: 2,
      name: "C. Milk for the cats.",
      description: "-",
      date: "2001-09-13",
      priority: 1,
      tasklistname: "TaskListA",
      isdone: false,
    },
    {
      id: 3,
      name: "A. Milk for the hedgehogs.",
      description: "-",
      date: "2002-01-01",
      priority: 2,
      tasklistname: "TaskListA",
      isdone: true,
    },
    {
      id: 4,
      name: "Dont stay awake for the whole night.",
      description: "-",
      date: "2002-12-12",
      priority: 1,
      tasklistname: "TaskListA",
      isdone: true,
    },
  ]);
>>>>>>> a581a04 (Add proper dates for tasklist in StateContainer.)

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
