import React, { useState, useEffect } from 'react';
// Import components
import TodoList from './Todolist';
import Collapsible from './Collapsible';

const ListComponent = ({
  todos,
  lists,
  todoHandler,
  collapsibleStates,
  isLoaded,
  statusMessage,
}) => {
  const [collapsedListStates, setCollapsedListStates] = useState([]);

  // Populate collapsedListStates with relevant objects.
  useEffect(() => {
    let array = [];
    array = lists.map((item) => {
      item = {
        id: item.id,
        isOpen: false,
      };
      return item;
    });
    setCollapsedListStates(array);
  }, [lists]);

  const list = [];
  todos.forEach((todo) => {
    if (!list.includes(todo.list)) {
      list.push(todo.list);
    }
  });

  const getListId = (listname) => {
    const list = lists.find((item) => {
      return item.name.toLowerCase() === listname.toLowerCase();
    });
    return list.id;
  };

  const handleCollapse = (listId) => {
    let tmp = [...collapsedListStates];
    let clickedIndex = tmp.findIndex((item) => item.id === listId);
    tmp[clickedIndex].isOpen = !tmp[clickedIndex].isOpen;
    setCollapsedListStates(tmp);
  };

  const setCollapsed = (listItem) => {
    let collapsibleState = collapsedListStates.find(
      ({ id }) => id === getListId(listItem)
    );
    return collapsibleState.isOpen;
  };

  const generateLists = list.map((listItem) => {
    const filtered = todos.filter((todo) => todo.list === listItem);

    return (
      <ul key={getListId(listItem)}>
        <Collapsible
          id={getListId(listItem)}
          header={<h3>{listItem}</h3>}
          onClick={handleCollapse}
          isOpen={setCollapsed(listItem)}
        >
          <TodoList
            todos={filtered}
            todoHandler={todoHandler}
            collapsibleStates={collapsibleStates}
          />
        </Collapsible>
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
