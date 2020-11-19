import React, { useState } from 'react';

/*
  Collapsible is a simple wrapper to allow showing/hiding of content.
  Collapsible's header prop is the content which is always visible,
  the 'header' or 'toggler' part of the component.
  This 'header' element can be clicked to toggle the collapsible content.
  
  Example of use:
  <Collapsible header={<div><p>This can be any React component!</p></div>} >
    <div>
       <p>
           Any content here within the Collapsible tags will be
           the collapsible content
       </p>
    </div>
  </Collapsible>
*/
function Collapsible(props) {
  const [open, setOpen] = useState(false);

  const toggleCollapsed = (e) => {
    setOpen(!open);
  };

  return (
    <div className='collapsible'>
      <div className='collapsible-header' onClick={toggleCollapsed}>
        {props.header}
      </div>
      <div className='collapsible-content'>{open ? props.children : null}</div>
    </div>
  );
}

export default Collapsible;
