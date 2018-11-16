import React from 'react';
import SimpleTableCell from './simpleTableCell.jsx'

const SimpleTableRow = (props) => {
	
  return (
    <tr>
      {props.headers.map((header) => <SimpleTableCell header={header} data={props.row} key={header.id}/>)}
    </tr>
  );	
}

export default SimpleTableRow;