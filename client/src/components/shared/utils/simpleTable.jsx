import React from 'react';
import { Table } from 'reactstrap';
import SimpleTableRow from './simpleTableRow.jsx'

const SimpleTable = (props) => {
	
	return (
    <div>
       <Table bordered size="sm">
          <tbody>
            {props.data.map((tablerow) => <SimpleTableRow item={tablerow} headers={props.headers} key={tablerow.id} cssClass={props.cssClass}/>)}
          </tbody>
       </Table>  
    </div>
  );	
}

export default SimpleTable;