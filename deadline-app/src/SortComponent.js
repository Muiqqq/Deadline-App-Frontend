import React from "react";

function SortButton(props) {
  const handleClick = (e) => {
    props.onClick(props.label);
  };

  return <button onClick={handleClick}>{props.label}</button>;
}

class SortButtonListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ul className="sortbuttonlist">
        <li>TEST</li>
        <li>TEST2</li>
        <li>TEST3</li>
      </ul>
    );
  }
}

export default SortButtonListComponent;
