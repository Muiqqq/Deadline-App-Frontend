import React from "react";

function SortButton(props) {
  const handleClick = (e) => {
    const arr = props.tasklist.slice();

    switch (props.label) {
      case "Name":
        arr.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Priority":
        arr.sort((a, b) => a.priority - b.priority);
        break;
      case "isDone":
        arr.sort((a, b) => b.isdone - a.isdone);
        break;
      default:
        alert("Something went wrong");
    }

    props.updateTasklist(arr);
  };

  return <button onClick={handleClick}>{props.label}</button>;
}

function SortButtonListComponent(props) {
  /*
  const handleClick = (label, e) => {
    alert(`Button ${label} was clicked`);
  };
  */

  return (
    <div>
      <h2>Sort by:</h2>
      <ul className="sortbuttonlist">
        <li>
          <SortButton
            label="Name"
            tasklist={props.tasklist}
            updateTasklist={props.updateTasklist}
          />
        </li>
        <li>
          <SortButton
            label="Priority"
            tasklist={props.tasklist}
            updateTasklist={props.updateTasklist}
          />
        </li>
        <li>
          <SortButton
            label="isDone"
            tasklist={props.tasklist}
            updateTasklist={props.updateTasklist}
          />
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
