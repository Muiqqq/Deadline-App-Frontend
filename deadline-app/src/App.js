import React from 'react';
import './scss/Main.scss';
import axios from './config/axiosconfig';
// Import components
import TodoForm from './components/TodoForm';
import ListComponent from './components/ListComponent';
import SortComponent from './components/SortComponent';

const todoFormButtonLabel = {
  ADD: 'Add',
  EDIT: 'Edit',
};

const DEFAULT_LIST = 'deadlines';

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
      isLoaded_lists: false,
      isLoaded_todos: false,
      isLoaded: false,
      statusMessage: 'Fetching data...',
      todos: [],
      lists: [],
      todoFormState: {
        name: '',
        date: '',
        priority: '',
        list: '',
        descritpion: '',
        isdone: false,
      },
      todoFormSubmitButtonLabel: todoFormButtonLabel.ADD,
      collapsibleStates: [],
    };
  }

  handleInitialFetch = (resource, success) => {
    axios
      .get('/'.concat(resource))
      .then((res) => {
        if (res.hasOwnProperty('data')) {
          success(res);
        } else {
          throw new Error('Data fetching failed.');
        }
      })
      .catch((err) => {
        this.handleFetchError(err, () => {
          const key = 'isLoaded_'.concat(resource);
          this.setState({ [key]: true });
        });
      });
  };

  // move this to its own file?
  // or maybe refactor so that no conversion needs be made
  // as i had originally planned, that the object would be
  // identical across both front and back
  convertTodoContext = (todo) => {
    const context = todo.hasOwnProperty('date') ? 'frontend' : 'backend';
    if (context === 'frontend') {
      const tmp = {
        date_deadline: todo.date !== '' ? todo.date : null,
        name: todo.name,
        description: todo.description,
        priority: +todo.priority,
        is_done: todo.isdone,
        listid: this.getListId(todo.list),
      };
      // When adding new todo, these are assigned by the backend service,
      // so they won't be there before the added todo has been
      // fetched back from the api.
      // When editing a todo, these keys would've been added by the
      // backend, and need to be sent there.
      if (todo.created) {
        tmp.date_created = todo.created;
      }
      if (todo.id) {
        tmp.id = todo.id;
      }
      return tmp;
    }
    if (context === 'backend') {
      // Backend will always return all fields
      const tmp = {
        id: todo.id,
        name: todo.name,
        date: todo.date_deadline,
        priority: todo.priority,
        listid: todo.listid,
        list: this.getListName(todo.listid),
        description: todo.description,
        isdone: todo.is_done,
        created: todo.date_created,
      };
      return tmp;
    }
    return todo;
  };

  // TODO: REMOVE DUPLICATE CODE, MOVE INITIAL FETCHING AXIOS
  // STUFF FROM LISTCOMPONENT TO THIS FILE!!! half done
  // and fix spaghett, or enjoy it with some bolognese sauce
  // on the side
  // Used for fetching.
  componentDidMount() {
    const resources = ['lists', 'todos'];
    for (const resource of resources) {
      this.handleInitialFetch(resource, (res) => {
        switch (resource) {
          case 'lists':
            this.setState({ lists: res.data, isLoaded_lists: true });
            break;
          case 'todos':
            const todos = res.data.map((item) => {
              return this.convertTodoContext(item);
            });
            let collapsibleStates = [...this.state.collapsibleStates];
            for (const element of todos) {
              const collapsibleStateObject = { id: element.id, isOpen: false };
              collapsibleStates = collapsibleStates.concat(
                collapsibleStateObject
              );
            }
            this.setState({
              todos: todos,
              collapsibleStates: collapsibleStates,
              isLoaded_todos: true,
            });
            break;
          default:
            console.log('Something went wrong.');
        }
      });
    }
  }

  // A response will be returned if the backend service
  // is up and running, in which case the db is reachable.
  // 404 here would just mean the db tables are empty, so operation
  // can be continued normally.
  handleFetchError = (err, cb) => {
    if (err.response && err.response.status === 404) {
      cb();
    } else {
      this.setState({ statusMessage: 'ERROR: Could not reach the api' });
    }
  };

  // Check that resources are loaded
  componentDidUpdate() {
    // If data has initially been fetched successfully,
    // flip isLoaded to true, so todos can be rendered.
    if (
      this.state.isLoaded_todos &&
      this.state.isLoaded_lists &&
      !this.state.isLoaded
    ) {
      this.setState({ isLoaded: true });
    }
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

  getListId = async (listname) => {
    let lists = [...this.state.lists];
    if (listname === '') {
      listname = DEFAULT_LIST;
    }
    const list = lists.find((item) => {
      return item.name.toLowerCase() === listname.toLowerCase();
    });
    if (list) {
      // console.log(list.id);
      return list.id;
    } else {
      // create new list in db, return it's id
      try {
        const result = await axios.post('/lists', { name: listname });
        return result.data.content.id;
      } catch (err) {
        // alert(err.response.data.msg);
        console.log(err.response);
      }
    }
    // return list.id;
  };

  getListName = (listid) => {
    let lists = [...this.state.lists];
    const list = lists.find((item) => {
      return item.id === listid;
    });
    return list.name;
  };

  handleSubmit = async (todo) => {
    let todos = [...this.state.todos];
    let lists = [...this.state.lists];
    let collapsibleStates = [...this.state.collapsibleStates];
    // If editing
    if (this.state.todoFormSubmitButtonLabel === todoFormButtonLabel.EDIT) {
      const indexOfEditedTodo = todos.findIndex(
        (element) => element.id === todo.id
      );
      todos[indexOfEditedTodo] = todo;
    } else {
      // If adding
      try {
        const listid = await this.getListId(todo.list);
        const todoBackendContext = {
          date_deadline: todo.date !== '' ? todo.date : null,
          name: todo.name,
          description: todo.description,
          priority: +todo.priority,
          is_done: todo.isdone,
          listid: listid,
        };

        const postResult = await axios.post('/todos', todoBackendContext);
        const addedTodoId = postResult.data.content.id;
        const obj = { id: addedTodoId, isOpen: false };
        collapsibleStates = collapsibleStates.concat(obj);
        const getResult = await axios.get(`/todos/${addedTodoId}`);
        // console.log(getResult.data);
        // console.log(lists);
        if (
          !lists.includes({
            id: todoBackendContext.listid,
            name: todo.list,
          })
        ) {
          const getListsResult = await axios.get('/lists');
          this.setState({ lists: getListsResult.data });
        }
        const tmp = getResult.data[0];
        const todoContext = {
          id: tmp.id,
          name: tmp.name,
          date: tmp.date_deadline,
          priority: tmp.priority,
          listid: tmp.listid,
          list: this.getListName(tmp.listid),
          description: tmp.description,
          isdone: tmp.is_done,
          created: tmp.date_created,
        };
        todos = todos.concat(todoContext);
      } catch (err) {
        // alert(err.response.data.msg);
        console.log(err.response);
      }
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
    return todoformstate;
  };

  handleSort = (sortedTodos) => {
    this.setState({ todos: sortedTodos });
  };

  todoHandler = {
    collapse: (todoId) => {
      let collapsibleStates = [...this.state.collapsibleStates];
      collapsibleStates.forEach((element) => {
        element.isOpen = todoId === element.id ? !element.isOpen : false;
      });
      this.setState({ collapsibleStates: collapsibleStates });
    },

    // Filtering happens here where we have access to whole list
    // of todos
    delete: (todoId) => {
      const temp = this.state.todos.filter((el) => {
        // console.log(el);
        return el.id !== todoId;
      });
      this.setState({
        todos: temp,
      });
    },

    // Filtering happens here where we have access to whole list
    // of todos
    // NOTE: unmarking marked todos doesn't work for some reason
    complete: (todoId) => {
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
    },

    edit: (todoToEdit) => {
      this.setState({
        todoFormState: todoToEdit,
        todoFormSubmitButtonLabel: todoFormButtonLabel.EDIT,
      });
    },
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
              todoHandler={this.todoHandler}
              collapsibleStates={this.state.collapsibleStates}
              isLoaded={this.state.isLoaded}
              statusMessage={this.state.statusMessage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
