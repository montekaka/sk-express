import React from 'react';
import SkTable from './../../components/shared/table/skTable.jsx';

const ProductInventroies = (props) => {
  return (
    <div>
      <SkTable
        handleInputChange={props.handleInputChange}
        editing={props.editing} 
        headerItems={props.headerItems}
        items={props.items}
      />  
    </div>
  )
}

export default ProductInventroies;