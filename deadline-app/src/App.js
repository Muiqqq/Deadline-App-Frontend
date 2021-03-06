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

const default_lists = {
  DEADLINE: 'Deadlines',
  OTHER: 'Other tasks',
};

// Screen size at which it's too small to fit both the form
// and the list side by side.
const MOBILE_WIDTH_THRESHOLD = 1050;

// Todo:
// Cleanup
// Rename a bunch of functions and variables for clarity?
// Start extracting components where necessary, again for clarity.
// Confirmation dialog for delete button?
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
      listItemState: false,
      collapsibleStates: [],
      isFormVisibleWhenScreenSmall: false,
      default_list: default_lists.DEADLINE,
    };
  }

  // One function for all potential resources that need
  // fetching from the api at startup.
  handleInitialFetch = (resource, success) => {
    axios
      .get('/'.concat(`${resource}?apikey=${process.env.REACT_APP_APIKEY}`))
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

  // Used for fetching resources.
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

  // move this to its own file?
  // or maybe refactor so that no conversion needs be made
  // as i had originally planned, that the object would be
  // identical across both front and back
  // Objects used by the backend service look slightly different
  // is why this function is necessary for now.
  convertTodoContext = (todo) => {
    const context = todo.hasOwnProperty('date') ? 'frontend' : 'backend';
    if (context === 'frontend') {
      const backendContext = {
        date_deadline: todo.date !== '' ? todo.date : null,
        name: todo.name,
        description: todo.description,
        priority: +todo.priority,
        is_done: todo.isdone,
      };
      if (todo.listid) {
        backendContext.listid = todo.listid;
      }
      // When adding new todo, these keys are assigned by the backend
      // service, so they won't be there before the added todo has been
      // fetched back from the api.
      // When editing a todo, these keys would've been added by the
      // backend, and need to be sent there.
      if (todo.created) {
        backendContext.date_created = todo.created;
      }
      if (todo.id) {
        backendContext.id = todo.id;
      }
      return backendContext;
    }
    if (context === 'backend') {
      // Backend will always return all fields
      const frontendContext = {
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
      return frontendContext;
    }
    return todo;
  };

  // Looks up the ID of a list based on the lists name.
  // Lists are stored in the state, and fetched from the api
  // before first render.
  getListId = async (listname) => {
    let lists = [...this.state.lists];
    if (listname === '') {
      listname = this.state.default_list;
    }
    const list = lists.find((item) => {
      return item.name.toLowerCase() === listname.toLowerCase();
    });
    if (list) {
      return list.id;
    } else {
      // create new list in db, return it's id
      try {
        const result = await axios.post(
          `/lists?apikey=${process.env.REACT_APP_APIKEY}`,
          { name: listname }
        );
        return result.data.content.id;
      } catch (err) {
        console.log(err);
      }
    }
    // return list.id;
  };

  // Todo objects returned from api wont have a list name by default,
  // so its necessary to check which list name belongs to which list id.
  // Looks up the name of a list based on an id.
  // Lists are stored in the state, and fetched from the api
  // before first render.
  getListName = (listid) => {
    let lists = [...this.state.lists];
    const list = lists.find((item) => {
      return item.id === listid;
    });
    return list.name;
  };

  isLastTodoFromList = (todo) => {
    // Get all todos in the same list as
    // the todo given as an arg to this function.
    let temp = this.state.todos.filter((item) => {
      return item.list === todo.list;
    });
    let todosLeft = temp.length;

    if (todosLeft === 0) {
      return true;
    }
    return false;
  };

  // Handles the deadlineToggle button click
  // list input is visible (true) or invisible (false)
  // and is dependant on deadline toggle
  handleListClick = () => {
    // bandaid fix so that tasks go to correct list when no list
    // specified.
    // had to do it, no time to do properly
    if (this.state.listItemState) {
      this.setState({ default_list: default_lists.DEADLINE });
    } else {
      this.setState({ default_list: default_lists.OTHER });
    }
    this.setState((prevState) => ({
      listItemState: !prevState.listItemState,
    }));
  };

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

  // Handles what happens when user presses the (Add/Edit) button
  // in the TodoForm.
  handleSubmit = async (todo) => {
    let todos = [...this.state.todos];
    let lists = [...this.state.lists];
    let collapsibleStates = [...this.state.collapsibleStates];

    // When submitting the form, and the screen size is
    // small, flip a flag so the form is hidden.
    if (window.innerWidth < MOBILE_WIDTH_THRESHOLD) {
      this.setState({ isFormVisibleWhenScreenSmall: false });
    }

    try {
      // Get a list id for the todo which is being added/edited
      const listid = await this.getListId(todo.list);
      const todoBackendContext = this.convertTodoContext(todo);
      todoBackendContext.listid = listid;

      // If editing a todo
      if (this.state.todoFormSubmitButtonLabel === todoFormButtonLabel.EDIT) {
        const indexOfEditedTodo = todos.findIndex(
          (element) => element.id === todo.id
        );
        // Put (update) the todo object in db with new info
        const putTodoResponse = await axios.put(
          `/todos/${todo.id}?apikey=${process.env.REACT_APP_APIKEY}`,
          todoBackendContext
        );

        // If updated successfully, apply changes
        // to state so the new info gets rendered.
        if (putTodoResponse.status === 200) {
          // workaround for default list not rendering properly
          // for edited todos which have empty task list field.
          if (todo.list === '') {
            todo.list = this.state.default_list;
          }

          // Check if a new list was added, if yes, then
          // fetch the lists from api again.
          if (
            !lists.includes({
              id: todoBackendContext.listid,
              name: todo.list,
            })
          ) {
            const getListsResult = await axios.get(
              `/lists?apikey=${process.env.REACT_APP_APIKEY}`
            );
            this.setState({ lists: getListsResult.data });
          }
          todos[indexOfEditedTodo] = todo;
        } else {
          throw new Error('ERROR: Could not update entry in db.');
        }
      } else {
        // If adding a new todo

        // Post the todo object to the api in the correct context.
        const postResponse = await axios.post(
          `/todos?apikey=${process.env.REACT_APP_APIKEY}`,
          todoBackendContext
        );
        const addedTodoId = postResponse.data.content.id;

        // Create a collapsible context object for the new todo.
        const collapsibleContext = { id: addedTodoId, isOpen: false };
        collapsibleStates = collapsibleStates.concat(collapsibleContext);

        // Check if a new list was added, if yes, then
        // fetch the lists from api again.
        // note to self: this should be a function as it's duplicated
        // somewhere above >:(
        if (
          !lists.includes({
            id: todoBackendContext.listid,
            name: todo.list,
          })
        ) {
          const getListsResult = await axios.get(
            `/lists?apikey=${process.env.REACT_APP_APIKEY}`
          );
          this.setState({ lists: getListsResult.data });
        }

        // Finally, fetch the newly added todo and convert it into
        // correct context. If the post request was successful, we could
        // just concat the same object to todos, but this way all the
        // info added/changed by the backend service will always be
        // included in what is stored here in the frontend app.
        const getTodoResponse = await axios.get(
          `/todos/${addedTodoId}?apikey=${process.env.REACT_APP_APIKEY}`
        );
        const tmp = getTodoResponse.data[0];
        const todoFrontendContext = this.convertTodoContext(tmp);
        todos = todos.concat(todoFrontendContext);
      }
    } catch (err) {
      console.log(err);
    }

    this.setState({
      todos: todos,
      todoFormState: this.resetTodoFormState(),
      todoFormSubmitButtonLabel: todoFormButtonLabel.ADD,
      collapsibleStates: collapsibleStates,
    });
  };

  // Functionality for TodoForms cancel button
  handleCancel = () => {
    // When canceling the submit of the form, and the screen size is
    // small, flip a flag so the form is hidden.
    if (window.innerWidth < MOBILE_WIDTH_THRESHOLD) {
      this.setState({ isFormVisibleWhenScreenSmall: false });
    }
    this.setState({
      todoFormState: this.resetTodoFormState(),
      todoFormSubmitButtonLabel: todoFormButtonLabel.ADD,
    });
  };

  resetTodoFormState = () => {
    let todoformstate = {};
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

  // Gets todo object based on id.
  getTodoObject = (todoId) => {
    const todo = this.state.todos.filter((el) => el.id === todoId);
    console.log(todo);
    return todo[0];
  };

  // Functions related to the todo items.
  todoHandler = {
    // Handles expand/collapse of todo items, only one
    // can be expanded at a time!
    collapse: (todoId) => {
      let collapsibleStates = [...this.state.collapsibleStates];
      collapsibleStates.forEach((element) => {
        element.isOpen = todoId === element.id ? !element.isOpen : false;
      });
      this.setState({ collapsibleStates: collapsibleStates });
    },

    // Handles deletion of todo items
    // Filtering happens here where we have access to whole list
    // of todos
    delete: async (todoId) => {
      const todo = this.getTodoObject(todoId);
      try {
        const deleteResponse = await axios.delete(
          `todos/${todoId}?apikey=${process.env.REACT_APP_APIKEY}`
        );
        if (deleteResponse.status === 204) {
          const temp = this.state.todos.filter((el) => {
            // console.log(el);
            return el.id !== todoId;
          });
          this.setState({
            todos: temp,
          });
          // If last item on list delete list (if list is not deadlines i.e. default)
          if (todo.list !== 'deadlines') {
            if (this.isLastTodoFromList(todo)) {
              const listId = await this.getListId(todo.list);
              const deleteListRes = await axios.delete(
                `lists/${listId}?apikey=${process.env.REACT_APP_APIKEY}`
              );
              if (deleteListRes.status === 204) {
                const temp = this.state.lists.filter((el) => {
                  return el.id !== listId;
                });
                this.setState({
                  lists: temp,
                });
              } else {
                throw new Error(
                  `ERROR: Could not delete list with id: ${listId} from db.`
                );
              }
            }
          }
        } else {
          throw new Error(
            `ERROR: Could not delete todo with id: ${todoId} from db.`
          );
        }
      } catch (err) {
        console.log(err);
      }
    },

    // Handles completion of todo items
    // Filtering happens here where we have access to whole list
    // of todos
    complete: async (todoId) => {
      // Check if todo is done or not before updating is_done value
      const todo = this.getTodoObject(todoId);
      let todoBackendContext = { is_done: !todo.isdone };
      try {
        const updateResponse = await axios.put(
          `todos/${todoId}?apikey=${process.env.REACT_APP_APIKEY}`,
          todoBackendContext
        );
        if (updateResponse.status === 200) {
          const temp = [...this.state.todos];
          let idx = temp.findIndex((x) => x.id === todoId);
          temp[idx] = {
            ...temp[idx],
            isdone: !temp[idx].isdone,
          };
          this.setState({
            todos: temp,
          });
        } else {
          throw new Error(
            `Error: Could not mark todo done with id: ${todoId} in db.`
          );
        }
      } catch (err) {
        console.log(err);
      }
    },

    // Handles todo items' edit button functionality.
    // (The one in the todo item itself, can be seen
    //  when it's expanded)
    edit: (todoToEdit) => {
      if (window.innerWidth < MOBILE_WIDTH_THRESHOLD) {
        this.setState({ isFormVisibleWhenScreenSmall: true });
      }
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
          <button
            className={
              this.state.isFormVisibleWhenScreenSmall
                ? 'floating-action-button fab-hidden'
                : 'floating-action-button fab-visible'
            }
            onClick={() => {
              this.setState({ isFormVisibleWhenScreenSmall: true });
            }}
          >
            <i className='fas fa-plus' />
          </button>
          <div
            className={
              this.state.isFormVisibleWhenScreenSmall
                ? 'form form-visible'
                : 'form form-hidden'
            }
          >
            <TodoForm
              handleListClick={this.handleListClick}
              listItemState={this.state.listItemState}
              submitButtonLabel={this.state.todoFormSubmitButtonLabel}
              todoFormState={this.state.todoFormState}
              onInputChange={this.handleTodoFormInputChange}
              onFormSubmit={this.handleSubmit}
              onFormCancel={this.handleCancel}
            />
          </div>
          <div
            className={
              this.state.isFormVisibleWhenScreenSmall
                ? 'todo-list list-hidden'
                : 'todo-list list-visible'
            }
          >
            <SortComponent
              tasklist={this.state.todos}
              updateTasklist={this.handleSort}
            />
            <ListComponent
              todos={this.state.todos}
              lists={this.state.lists}
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
