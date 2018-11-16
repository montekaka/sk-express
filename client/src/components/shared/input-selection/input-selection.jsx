import React from 'react';
import _ from 'underscore';
import { Input } from 'reactstrap';

const SkInputSelect = (props) => {

	function handleChange(event) {
		props.handleSelect(event.target);
  }
  
  function getOptions(options, selectedValue, keyLabel) {
    let result = _.filter(options, (item) => {
      return item[keyLabel] === selectedValue;
    });
    result = _.uniq(result);
    // result.splice(0,2); // to remove duplicated records
    
    _.each(options, (item) => {
      if (item[keyLabel] != selectedValue) {
        result.push(item);
      }
    });
    const listItems = result.map((item) => 
      <option key={item[keyLabel]}>{item[keyLabel]}</option>
    );
    return listItems;
  }

  return (
    <Input type="select" 
      name={props.selectName} 
      id="skSelect"       
      onChange={handleChange}  >
      {getOptions(props.options, props.selectedValue, props.optionsKeyLabel)}
    </Input>
  )
};

export default SkInputSelect;