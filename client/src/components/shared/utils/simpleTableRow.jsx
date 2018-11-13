import React from 'react';
import { Table } from 'reactstrap';

const SimpleTableRow = (props) => {
	
	return (
    <tr>
      {props.headers.map((header) => <td key={header} className={props.cssClass}>{props.item[header]}</td>)}
    </tr>
  );	
}

export default SimpleTableRow;