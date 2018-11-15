import React from 'react';
import { Table } from 'reactstrap';
import SimpleListItem from './simpleListItem.jsx'

const SimpleList = (props) => {
	
	return (
   <Table bordered size="sm">
      <tbody>
        {props.data.map((tablerow) => <SimpleListItem item={tablerow} headers={props.headers} key={tablerow.id} cssClass={props.cssClass}/>)}
      </tbody>
   </Table> 		
  );	
}

export default SimpleList;