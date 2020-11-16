import React from "react";
function MockListComponent(props) {
  const renderList = () => {
    const arr = props.tasklist.map((element) => {
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

  return <div className="mocklist">{renderList()}</div>;
}

/*
class MockListComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasklist: props.tasklist,
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
*/

export default MockListComponent;
