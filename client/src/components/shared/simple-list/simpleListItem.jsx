import React from 'react';


const SimpleListItem = (props) => {
	
	return (
    <tr>
      {props.headers.map((header) => <td key={header} className={props.cssClass}>{props.item[header]}</td>)}
    </tr>
  );	
}

export default SimpleListItem;