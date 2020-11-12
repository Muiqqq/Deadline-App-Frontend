import React from "react";

class MockListComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasklist: [
        {
          id: 1,
          name: "B. Milk for the crocs.",
          description: "-",
          date: "YYYY-MM-DD",
          priority: 3,
          tasklistname: "TaskListA",
          isdone: false,
        },
        {
          id: 2,
          name: "C. Milk for the cats.",
          description: "-",
          date: "YYYY-MM-DD",
          priority: 1,
          tasklistname: "TaskListA",
          isdone: false,
        },
        {
          id: 3,
          name: "A. Milk for the hedgehogs.",
          description: "-",
          date: "YYYY-MM-DD",
          priority: 2,
          tasklistname: "TaskListA",
          isdone: false,
        },
      ],
    };
  }

  renderList = (list) => {
    const arr = list.map((element) => {
      return (
        <li key={element.id}>
          <h4>{element.isdone.toString()}</h4>
          <h4>pr: {element.priority}</h4>
          <h4>{element.name}</h4>
          <h4>{element.date}</h4>
        </li>
      );
    });
    return <ul>{arr}</ul>;
  };

  render() {
    return (
      <div className="mocklist">{this.renderList(this.state.tasklist)}</div>
    );
  }
}

export default MockListComponent;
