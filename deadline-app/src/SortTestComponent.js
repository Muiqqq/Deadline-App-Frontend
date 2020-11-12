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
          priority: 2,
          tasklistname: "TaskListA",
          isdone: false,
        },
        {
          id: 2,
          name: "C. Milk for the cats.",
          description: "-",
          date: "YYYY-MM-DD",
          priority: 3,
          tasklistname: "TaskListA",
          isdone: false,
        },
        {
          id: 3,
          name: "A. Milk for the hedgehogs.",
          description: "-",
          date: "YYYY-MM-DD",
          priority: 1,
          tasklistname: "TaskListA",
          isdone: false,
        },
      ],
    };
  }
}

export default MockListComponent;
