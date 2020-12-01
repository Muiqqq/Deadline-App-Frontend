import React, { useState, useEffect } from 'react';
import axios from '../config/axiosconfig';
// Import components
import TodoList from './Todolist';

const ListComponent = ({ todos, todoHandler, collapsibleStates }) => {
  const [isLoaded, setIsLoaded] = useState(null);
  const [statusMessage, setStatusMessage] = useState('Fetching data...');
  const [lists, setLists] = useState({});
  const [tasks, setTasks] = useState({});
  const list = [];
  todos.forEach((todo) => {
    if (!list.includes(todo.list)) {
      list.push(todo.list);
    }
  });

  // Fetch todos and lists
  useEffect(() => {
    axios
      .get('/lists')
      .then((res) => {
        setLists(res);
      })
      .catch((err) => {
        if (err.response) {
          setLists(err.response.data);
        } else {
          setStatusMessage('ERROR: Could not reach the API.');
          throw err;
        }
      });

    axios
      .get('/todos')
      .then((res) => {
        setTasks(res);
      })
      .catch((err) => {
        if (err.response) {
          setTasks(err.response.data);
        } else {
          setStatusMessage('ERROR: Could not reach the API.');
          throw err;
        }
      });
  }, []);

  // Send fetched todos and lists to parent
  useEffect(() => {
    // Only run this if both lists and tasks have been fetched successfully.
    if (lists.hasOwnProperty('data') && tasks.hasOwnProperty('data')) {
      setIsLoaded(true);
      todoHandler.fetch(lists.data, tasks.data);
    }
  }, [todoHandler, lists, tasks]);

  const generateLists = list.map((listItem) => {
    const filtered = todos.filter((todo) => todo.list === listItem);
    // Change key to listid once refactored
    return (
      <ul key={listItem}>
        <h3>{listItem}</h3>
        <TodoList
          todos={filtered}
          todoHandler={todoHandler}
          collapsibleStates={collapsibleStates}
        />
      </ul>
    );
  });

  if (!isLoaded) {
    return <div className='list'>{statusMessage}</div>;
  } else {
    return <div className='list'>{generateLists}</div>;
  }
};

export default ListComponent;
