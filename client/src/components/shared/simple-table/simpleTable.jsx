import React from 'react';
import { Table } from 'reactstrap';
import SimpleTableHeader from './simpleTableHeader.jsx'
//import SimpleTableRow from './simpleTableRow.jsx'

const SimpleTable = (props) => {
	
  return (
    <div>
      <Table bordered size="sm">
        <SimpleTableHeader headers={props.headers}/>
      </Table>
    </div>
  );	
}

export default SimpleTable;