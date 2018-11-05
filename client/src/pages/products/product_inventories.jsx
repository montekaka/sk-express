import React from 'react';
import SkTable from './../../components/shared/table/skTable.jsx';

const ProductInventroies = (props) => {
  return (
    <div>
      <SkTable 
        headerItems={props.headerItems}
        items={props.items}
      />  
    </div>
  )
}

export default ProductInventroies;