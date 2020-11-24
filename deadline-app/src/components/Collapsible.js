import React from 'react';

/*
  Collapsible is a simple wrapper to allow showing/hiding of content.
  Collapsible's header prop is the content which is always visible,
  the 'header' or 'toggler' part of the component.
  This 'header' element can be clicked to toggle the collapsible content.
*/
function Collapsible(props) {
  const handleClick = () => {
    props.onClick(props.id);
  };

  return (
    <div className='collapsible'>
      <div className='collapsible-header' onClick={handleClick}>
        {props.header}
      </div>
      <div
        className={
          props.open ? 'collapsible-content' : 'collapsible-content collapsed'
        }
      >
        {props.open ? props.children : null}
      </div>
    </div>
  );
}

export default Collapsible;
