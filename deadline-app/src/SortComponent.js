import React from "react";

function SortButton(props) {
  const handleClick = (e) => {
    props.onClick(props.label);
  };

  return <button onClick={handleClick}>{props.label}</button>;
}

function SortButtonListComponent(props) {
  const handleSorting = (buttonLabel) => {
    const arr = props.tasklist.slice();

    arr.sort((a, b) => {
      switch (buttonLabel) {
        case "Name":
          return a.name.localeCompare(b.name);
        case "Priority":
          return a.priority - b.priority;
        case "isDone":
          return b.isdone - a.isdone;
        default:
          return 0;
      }
    });

    props.updateTasklist(arr);
  };

  return (
    <div>
      <h2>Sort by:</h2>
      <ul className="sortbuttonlist">
        <li>
          <SortButton label="Name" onClick={handleSorting} />
        </li>
        <li>
          <SortButton label="Priority" onClick={handleSorting} />
        </li>
        <li>
          <SortButton label="isDone" onClick={handleSorting} />
        </li>
      </ul>
    </div>
  );
}

/*
class SortButtonListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = (label, e) => {
    alert(`Button ${label} was clicked`);
  };

  render() {
    return (
      <div>
        <h2>Sort by:</h2>
        <ul className="sortbuttonlist">
          <li>
            <SortButton label="Name" onClick={this.handleClick} />
          </li>
          <li>
            <SortButton label="Priority" onClick={this.handleClick} />
          </li>
          <li>
            <SortButton label="isDone" onClick={this.handleClick} />
          </li>
        </ul>
      </div>
    );
  }
}
*/
export default SortButtonListComponent;
