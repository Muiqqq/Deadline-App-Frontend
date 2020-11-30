import React, { useState, useEffect } from 'react';
import axios from '../config/axiosconfig';
// Import components
import TodoList from './Todolist';

const ListComponent = ({ todos, todoHandler, collapsibleStates }) => {
  const [isLoaded, setIsLoaded] = useState(null);
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);
  const list = [];
  todos.forEach((todo) => {
    if (!list.includes(todo.list)) {
      list.push(todo.list);
    }
  });

  // Fetch lists
  useEffect(() => {
    axios.get('/lists').then((res) => {
      if (res.status === 200) {
        setLists(res.data);
      } else {
        // implement error handling if fetch failed
      }
    });
  }, []);

  // Fetch todos
  useEffect(() => {
    axios.get('/todos').then((res) => {
      if (res.status === 200) {
        setTasks(res.data);
      } else {
        // implement error handling if fetch failed
      }
    });
  }, []);

  // Send fetched todos and lists to parent
  useEffect(() => {
    if (lists.length > 0 && tasks.length > 0) {
      setIsLoaded(true);
      todoHandler.fetch(lists, tasks);
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
    return <div className='list'>Fetching data...</div>;
  } else {
    return <div className='list'>{generateLists}</div>;
  }
};

export default ListComponent;
