import React from 'react';

const SimpleTableHeader = (props) => {
	
	return (
    <thead>
      <tr>
        {
          props.headers.map((header) => <th key={header['id']}>{header['label']}</th>)
        }
      </tr>
    </thead>
  );	
}

export default SimpleTableHeader;