import React from 'react';
import SimpleDropdown from './../simple-dropdown/simpleDropdown.jsx';

const SkPicker = (props) => {
  switch (props.filter.control) {
    case 'simple-dropdown':
      return <SimpleDropdown filter={props.filter} handleChange={props.handleChange} filterId={props.filterId}/>;
      break;
    default:
      return (<div>Error, please email Josh</div>)
  }
}

export default SkPicker;