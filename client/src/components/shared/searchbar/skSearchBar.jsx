import React from 'react';
import { Input } from 'reactstrap';


const SkSearchBar = (props) => {

	function handleChange(event) {
		props.handleSearch(event.target.value);
	}

  return (
    <Input placeholder="Search..." name="search" onChange={handleChange}/>
  )
};


export default SkSearchBar;