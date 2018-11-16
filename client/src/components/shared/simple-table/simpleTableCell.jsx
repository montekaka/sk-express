import React from 'react';
import { Table } from 'reactstrap';
import Pipe from './../../../../../resource/libs/helpers/pipe.js';

const actions = Pipe.actions;

const SimpleTableCell = (props) => {
	
  function cellValue(props) {
    const columnName = props.header['name'];
    const format = props.header['format'];
    const value = props.data[columnName];
    //return format
    return format ? actions[format](value) : value;
  }

  return (
    <td>
      {cellValue(props)}
    </td>
  );	
}

export default SimpleTableCell;