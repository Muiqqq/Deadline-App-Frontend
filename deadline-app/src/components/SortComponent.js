import React, { useState, useEffect } from 'react';

function SortButton(props) {
  const handleClick = (e) => {
    props.onClick(props.label);
  };

  return (
    <button className='btn py-05' onClick={handleClick}>
      {props.label}
    </button>
  );
}

function SortButtonListComponent(props) {
  const [sortAscending, setSortAscending] = useState(true);
  const [previouslyClicked, setPreviouslyClicked] = useState(null);

  const tasklist = props.tasklist.slice();
  const updateTasklist = props.updateTasklist;

  // Sort handling
  useEffect(() => {
    tasklist.sort((a, b) => {
      if (a.list !== b.list) {
        return a.list.localeCompare(b.list);
      } else {
        switch (previouslyClicked) {
          case 'Date':
            // Nulls are sorted in 'reverse' order, it
            // seems more logical this way, as now closest
            // dates are first, not nulls.
            return sortAscending
              ? (a.date === null) - (b.date === null) ||
                  new Date(a.date) - new Date(b.date)
              : (b.date === null) - (a.date === null) ||
                  new Date(b.date) - new Date(a.date);
          case 'Name':
            return sortAscending
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          case 'Priority':
            // Value 0 for priority is also sorted in reverse
            // order, for similar reasons as date null sorting.
            // Value 0 represents 'no priority', so shouldn't
            // be shown before 1, which is the highest priority.
            return sortAscending
              ? (a.priority === 0) - (b.priority === 0) ||
                  a.priority - b.priority
              : (b.priority === 0) - (a.priority === 0) ||
                  b.priority - a.priority;
          case 'Completed':
            return sortAscending ? b.isdone - a.isdone : a.isdone - b.isdone;
          default:
            return 0;
        }
      }
    });
    updateTasklist(tasklist);

    // Below is necessary to stop eslint from complaining about
    // a missing dependency for useEffect().
    // The missing dependency is the tasklist being sorted, but
    // having it in the dep array causes an infinite loop.
    // Not having it there seems to work just fine (so far).

    // eslint-disable-next-line
  }, [sortAscending, previouslyClicked, updateTasklist]);

  const handleClick = (buttonLabel) => {
    if (buttonLabel === previouslyClicked) {
      setSortAscending(!sortAscending);
    } else {
      setSortAscending(true);
    }

    setPreviouslyClicked(buttonLabel);
  };

  return (
    <div>
      <ul className='sortbuttonlist'>
        Sort by:
        <li>
          <SortButton label='Date' onClick={handleClick} />
        </li>
        <li>
          <SortButton label='Name' onClick={handleClick} />
        </li>
        <li>
          <SortButton label='Priority' onClick={handleClick} />
        </li>
        <li>
          <SortButton label='Completed' onClick={handleClick} />
        </li>
      </ul>
    </div>
  );
}

export default SortButtonListComponent;
