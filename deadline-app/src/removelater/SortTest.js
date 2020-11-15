import React, { useState } from "react";
import SortButtonListComponent from "../components/SortComponent";
import Tasklist from "./SortTestComponent";

function SortTest(props) {
  const [tasklist, setTasklist] = useState([
    {
      id: 1,
      name: "B. Milk for the crocs.",
      description: "-",
      date: "2001-09-11",
      priority: 3,
      tasklistname: "TaskListA",
      isdone: false,
    },
    {
      id: 2,
      name: "C. Milk for the cats.",
      description: "-",
      date: "2001-09-13",
      priority: 1,
      tasklistname: "TaskListA",
      isdone: false,
    },
    {
      id: 3,
      name: "A. Milk for the hedgehogs.",
      description: "-",
      date: "2002-01-01",
      priority: 2,
      tasklistname: "TaskListA",
      isdone: true,
    },
    {
      id: 4,
      name: "Dont stay awake for the whole night.",
      description: "-",
      date: "2002-12-12",
      priority: 1,
      tasklistname: "TaskListA",
      isdone: true,
    },
  ]);

  return (
    <div>
      <SortButtonListComponent
        tasklist={tasklist}
        updateTasklist={setTasklist}
      />
      <Tasklist tasklist={tasklist} />
    </div>
  );
}

export default SortTest;
