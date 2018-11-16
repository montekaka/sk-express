import React from 'react';
import Pipe from './../../../../../resource/libs/helpers/pipe.js';

const actions = Pipe.actions;

const SimpleListItem = (props) => {

	function formatValue(item, header) {
		const value = item['format'] ? actions[item['format']](item[header]) : item[header];
		return value;
	}
 	
	return (
    <tr>
      {props.headers.map((header) => <td key={header} className={props.cssClass}>{formatValue(props.item, header)}</td>)}
    </tr>
  );	
}

export default SimpleListItem;