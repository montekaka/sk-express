import React from 'react';
import {  DropdownItem } from 'reactstrap';

const SimpleDropdownItem = (props) => {

  function handleClick(){
    props.handleChange(props.val, props.filterId - 1);
  }

  return (
    <DropdownItem onClick={handleClick}>{props.val}</DropdownItem>
  );
}

export default SimpleDropdownItem;