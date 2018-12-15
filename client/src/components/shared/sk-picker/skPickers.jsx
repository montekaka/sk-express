import React from 'react';
import SkPicker from './skPicker.jsx';

const SkPickers = (props) => {
  return (
    props.filters.map((picker) => <SkPicker filter={picker} handleChange={props.handleChange} key={picker.id} filterId={picker.id}/>)
  );
}

export default SkPickers;